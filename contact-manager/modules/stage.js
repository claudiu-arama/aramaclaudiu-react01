import { contacts } from './data.js';
import { render as renderEditForm } from './edit-contact.js';
import { render as renderMessage } from './msg.js';
import { addMessage, clearMessages } from './notification-bar.js';
import {
  addContact,
  deleteContact,
  editContact,
  getContact,
} from './query.js';

const stage = document.querySelector('.stage');
// delete contact
stage.addEventListener('click', (event) => {
  const button = event.target;
  // early returns go here
  if (
    button.nodeName === 'BUTTON' &&
    button.classList.contains('delete-contact')
  ) {
    const contactId = button.dataset.contactId;
    deleteContact(contactId);

    const contactContainer = button.closest('.contact').remove();

    const messageContainer = renderMessage(
      'Contact removed',
      'success',
    );

    addMessage(messageContainer);
  }
});
// start edit contact
stage.addEventListener('click', (event) => {
  const button = event.target;

  if (
    button.nodeName === 'BUTTON' &&
    button.classList.contains('edit-contact')
  ) {
    console.log('test');
    const contactId = button.dataset.contactId;
    const contact = getContact(contactId);

    // if (!contact) return;

    clearStage();
    stage.append(renderEditForm(contact));
  }
});

// cancel-edit-contact
stage.addEventListener('click', (event) => {
  const button = event.target;

  if (
    button.nodeName === 'BUTTON' &&
    (button.classList.contains('cancel-edit-contact') ||
      button.classList.contains('cancel-add-contact'))
  ) {
    clearStage();
    clearMessages();
  }
});

// save edit contact

stage.addEventListener('submit', (event) => {
  const form = event.target;

  if (
    form.nodeName === 'FORM' &&
    form.classList.contains('edit-contact')
  ) {
    event.preventDefault();

    const formData = new FormData(form);
    // this const points to the same value in memory
    const contact = {};
    // check formData.entries(); (maybe just debug it)
    const entries = formData.entries();
    let currentEntry = entries.next();

    while (currentEntry.done === false) {
      // validation required
      const [inputName, inputValue] = currentEntry.value;

      contact[inputName] = inputValue;

      currentEntry = entries.next();
    }

    editContact(contact.id, contact);

    addMessage(
      renderMessage(
        `Contact ${contact.name} ${contact.surname} has been saved.`,
        'success',
      ),
    );
    clearStage();
    setTimeout(() => {
      clearMessages();
    }, 500);
  }
});

// execute add contact

stage.addEventListener('submit', (event) => {
  const form = event.target;

  if (
    form.nodeName === 'FORM' &&
    form.classList.contains('add-contact')
  ) {
    event.preventDefault();

    const formData = new FormData(form);
    const contact = {};

    const entries = formData.entries();

    let currentEntry = entries.next();

    while (currentEntry.done === false) {
      const [inputName, inputValue] = currentEntry.value;

      contact[inputName] = inputValue;

      currentEntry = entries.next();
    }

    contact.id = contacts.length + 1;

    addContact(contact);

    const successMsg = renderMessage(
      `Contact ${contact.name} ${contact.surname} added.`,
      'success',
    );

    addMessage(successMsg);

    clearStage();
  }
});

export const clearStage = () => {
  stage.innerHTML = '';
};

export default stage;
