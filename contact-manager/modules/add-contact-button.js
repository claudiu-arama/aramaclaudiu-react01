import { render as renderAddContact } from './add-contact.js';
import { clearMessages } from './notification-bar.js';
import stage, { clearStage } from './stage.js';

const addContactBtn = document.querySelector('.add-contact-button');

addContactBtn.addEventListener('click', () => {
  clearStage();
  clearMessages();

  stage.append(renderAddContact());
});

export default addContactBtn;
