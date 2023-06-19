import React from "react";

const Modal = ({ hideModal, render }) => {
  return (
    <div onClick={hideModal} className="modal-background">
      <div className="modal-container">
        <div className="modal-title"></div>
        <div className="modal-body">{render()}</div>
        <div className="modal-footer">
          <button onClick={hideModal}>Cancel</button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
