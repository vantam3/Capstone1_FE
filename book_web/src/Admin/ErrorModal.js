import React from 'react';
import './ErrorModal.css'; 

const ErrorModal = ({ message, onClose }) => {
    return (
        <div className="error-modal-overlay">
            <div className="error-modal">
                <h2>Error</h2>
                <p>{message}</p>
                <div className="error-modal-buttons">
                    <button
                        className="error-modal-button go-home"
                        onClick={() => {
                            window.location.href = '/'; 
                        }}
                    >
                        Go Home
                    </button>
                    <button
                        className="error-modal-button close"
                        onClick={onClose} // Call the onClose function to dismiss the modal
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;
