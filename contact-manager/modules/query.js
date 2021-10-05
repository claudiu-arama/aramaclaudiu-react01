import { contacts } from './data.js';

// needle def val is query
export const findContact = (needle = 'query') => {
  return contacts.filter((contact) => {
    const values = Object.values(contact);

    const haystack = values.reduce((string, value) => {
      if (typeof value === 'string') {
        string += value.toLowerCase();
      }

      return string;
    }, '');

    if (haystack.includes(needle)) {
      return true;
    }

    return false;
  });
};

export const getContact = (contactId) => {
  contactId = Number(contactId);
  // this is not a callback, e un predicat
  return contacts.find(({ id }) => {
    return contactId === id;
  });
};

export const deleteContact = (contactId) => {
  contactId = Number(contactId);
  // oldschool approach
  let contactIndex = -1;
  for (let i = 0; i < contacts.length; i++) {
    const { id } = contacts[i];

    if (contactId === id) {
      contactIndex = i;
    }
  }

  if (contactIndex >= 0) {
    contacts.splice(contactIndex, 1);
  }
};

export const editContact = (contactId, payload) => {
  let contactIndex = -1;
  contactId = Number(contactId);

  for (let i = 0; i < contacts.length; i++) {
    // const {id} = contacts[i]; same same
    const contact = contacts[i];
    const id = contact.id;

    if (id === contactId) {
      contactIndex = i;
    }

    if (contactIndex >= 0) {
      payload.id = Number(payload.id);
      contacts[contactIndex] = payload;
    }
  }
};

export const addContact = (contact) => {
  contacts.push(contact);
};
