import React from "react";
import "./Modal.css"; 

const Modal = ({ title, message, onClose, type = "success" }) => {
  return (
    <div className="modal-overlay">
      <div className={`modal ${type}`}>
        <h3>{title}</h3>
        <p>{message}</p>
        <button className="close-modal-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
