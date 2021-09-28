export const render = (msg = '', type = 'primary') => {
  const msgContainer = document.createElement('div');

  msgContainer.classList.add('alert', `alert-${type}`);

  msgContainer.textContent = msg;

  return msgContainer;
};
