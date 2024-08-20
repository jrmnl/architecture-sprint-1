import React, { useState, useEffect } from 'react';
import SuccessIcon from '../images/success-icon.svg';
import ErrorIcon from '../images/error-icon.svg';

const MESSAGE_KEY = "tooltip-trigger";

function triggerInfoTooltop(status, text) {
  window.postMessage({
    type: MESSAGE_KEY,
    status,
    text
  });
}

function InfoTooltip() {
  const [ isOpen, setIsOpen] = useState(false);
  const [ message, setMessage] = useState();

  useEffect(() => {
    function listener(e) {
      if (e.data.type === MESSAGE_KEY) {
        setMessage(e.data);
        setIsOpen(true);
      }
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [setIsOpen, setMessage]);

  const icon = message?.status === 'success' ? SuccessIcon : ErrorIcon

  return (
    <div className={`popup ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__content">
        <form className="popup__form" noValidate>
          <button type="button" className="popup__close" onClick={() => setIsOpen(false)}></button>
          <div>
            <img className="popup__icon" src={icon} alt=""/>
            <p className="popup__status-message">{message?.text}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export { InfoTooltip, triggerInfoTooltop };
