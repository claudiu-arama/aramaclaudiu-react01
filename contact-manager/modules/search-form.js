import { findContact } from './query.js';
import { render as renderMessage } from './msg.js';
import { addMessage, clearMessages } from './notification-bar.js';
import { render as renderContact } from './contact.js';
import stage, { clearStage } from './stage.js';

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  let searchString = formData.get('q');

  searchString = searchString.trim();

  if (searchString.length < 1) {
    return;
  }

  // clear input after search
  form.querySelector('[name="q"]').value = '';

  clearMessages();

  // refactor:
  const contacts = findContact(searchString);
  const fragment = new DocumentFragment();
  const contactscount = contacts.length;

  contacts.forEach((contact) => {
    // this goes through DOM on every iteration
    // const stageElement = document.querySelector('.stage');
    // stageElement.append(renderContact(contact));

    fragment.append(renderContact(contact));
  });

  if (contactscount < 1) {
    const contactNotificationElement = renderMessage(
      'No contacts found',
      'warning',
    );
    addMessage(contactNotificationElement);
  } else {
    addMessage(
      renderMessage(
        `Found ${contactscount} ${
          contactscount > 1 ? 'contacts' : 'contact'
        }`,
        'success',
      ),
    );
  }

  clearStage();
  stage.append(fragment);
});

export default searchForm;
