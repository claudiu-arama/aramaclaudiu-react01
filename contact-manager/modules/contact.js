const buttonGroup = [
  {
    name: 'delete',
    displayName: 'Delete',
    buttonClass: 'btn-danger',
  },
  {
    name: 'edit',
    displayName: 'Edit',
    buttonClass: 'btn-primary',
  },
];
export const render = (contact) => {
  const contactContainer = document.createElement('article');
  contactContainer.classList.add('contact', 'border', 'p-3');

  const heading = document.createElement('h1');
  heading.textContent = `${contact.name} ${contact.surname}`;

  const information = document.createElement('ul');
  const phone = document.createElement('li');
  const email = document.createElement('li');

  phone.textContent = contact.phone;
  email.textContent = contact.email;

  information.append(phone);
  information.append(email);

  // create buttons from array of objects
  const fragment = new DocumentFragment();
  // destructure btn
  buttonGroup.forEach(({ name, displayName, buttonClass }) => {
    const newButton = document.createElement('button');

    newButton.classList.add(
      'btn',
      buttonClass,
      `${name}-contact`,
      'm-1',
    );
    newButton.type = 'button';
    newButton.title = displayName;
    newButton.innerHTML = displayName;
    newButton.dataset.contactId = contact.id;

    fragment.append(newButton);
  });

  contactContainer.append(heading);
  contactContainer.append(information);
  contactContainer.append(fragment);

  return contactContainer;
};
