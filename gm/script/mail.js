const mailboxListing = document.getElementById('mailbox-listing');
const toggleButton = document.getElementById('toggle-mailbox-button');

toggleButton.addEventListener('click', () => {
    // Toggle the width of the mailbox listing
    mailboxListing.style.width = mailboxListing.style.width === '0px' ? '200px' : '0px';
});

//Fake Emails JS

// mail.js

window.addEventListener('DOMContentLoaded', () => {
  fetch('https://cdn.jsdelivr.net/npm/faker/dist/faker.min.js')
    .then(response => response.text())
    .then(script => {
      // Evaluate the script
      eval(script);

      // Your code using the faker.js library
      const emailsContainer = document.getElementById('emails');
      const selectedEmails = new Set(); // Track selected email indices

      for (let i = 0; i < 100; i++) {
        const sender = faker.internet.email();
        const subject = faker.lorem.words(3);
        const timestamp = faker.date.recent();
        const emailText = faker.lorem.sentence();

        const emailElement = document.createElement('a');
        emailElement.classList.add('email');
        emailElement.href = '#';
        emailElement.innerHTML = `
          <div class="checkbox"></div>
          <span class="email-details">
            <span class="sender">${sender}</span>
            <span class="preview">${emailText}</span>
            <span class="timestamp">${formatTimestamp(timestamp)}</span>
          </span>
        `;

        emailsContainer.appendChild(emailElement);

        // Add event listener to checkboxes
        const checkbox = emailElement.querySelector('.checkbox');
        checkbox.addEventListener('click', () => {
          toggleEmailSelection(i);
        });
      }

      // Toggle email selection
      function toggleEmailSelection(index) {
        if (selectedEmails.has(index)) {
          selectedEmails.delete(index);
        } else {
          selectedEmails.add(index);
        }
        updateEmailSelection();
      }

      // Update email selection highlighting
      function updateEmailSelection() {
        const emailElements = document.querySelectorAll('.email');
        emailElements.forEach((emailElement, emailIndex) => {
          if (selectedEmails.has(emailIndex)) {
            emailElement.classList.add('selected');
          } else {
            emailElement.classList.remove('selected');
          }
        });
      }
    })
    .catch(error => {
      console.error('Failed to load faker.js:', error);
    });
});

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}


//Master check box

const masterCheckbox = document.getElementById('master-checkbox');
const emailCheckboxes = document.querySelectorAll('#emails .checkbox input[type="checkbox"]');

masterCheckbox.addEventListener('change', () => {
  const isChecked = masterCheckbox.checked;
  
  emailCheckboxes.forEach(checkbox => {
    checkbox.checked = isChecked;
    toggleEmailSelection(checkbox);
  });
});

emailCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    toggleEmailSelection(checkbox);
  });
});

function toggleEmailSelection(checkbox) {
  const emailElement = checkbox.closest('.email');
  
  if (checkbox.checked) {
    emailElement.classList.add('selected');
  } else {
    emailElement.classList.remove('selected');
  }
}
