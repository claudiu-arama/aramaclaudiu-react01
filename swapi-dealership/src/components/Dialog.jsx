import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
// @reach-ui -> google it
const dialogsHost = document.querySelector('.dialogs');
// default values set as well on show and onClose
export const Dialog = ({
  show = false,
  onClose = () => {},
  children,
}) => {
  const element = useRef(document.createElement('div'));

  useEffect(() => {
    const targetElement = element.current;
    dialogsHost.append(targetElement);

    return () => {
      targetElement.remove();
    };
  }, [element]);

  const renderDialog = () => {
    if (!show) {
      return <>dialog is closed</>;
    }

    return (
      <div className="fixed-top position-absolute d-flex justify-content-center align-items-center vh-100 vw-100">
        <div className="bg-white bg-opacity-100 shadow w-75">
          <header className="py-2 px-3 text-center">
            <button
              className="btn-link bg-transparent p-o b-0"
              title="close"
              type="button"
              onClick={onClose}>
              close
            </button>
          </header>
          <main className="p-2 text-dark">{children}</main>
        </div>
      </div>
    );
  };

  return createPortal(renderDialog(), element.current);
};

export default Dialog;

// google React Portals
// useRef keeps obj safe in memory, no deletion
