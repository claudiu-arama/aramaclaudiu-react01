const notificationBar = document.querySelector('.notification-bar');

export const addMessage = (msgElement) => {
  clearMessages();
  notificationBar.append(msgElement);
};

export const clearMessages = () => {
  // fastest way to clear
  notificationBar.innerHTML = '';
};

export default notificationBar;
