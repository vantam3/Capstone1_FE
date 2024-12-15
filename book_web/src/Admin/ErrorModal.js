import React from 'react';
import './ErrorModal.css';

const ErrorModal = ({ message, onClose }) => {
    const handleClose = () => {
        if (typeof onClose === 'function') {
            onClose(); // Call the onClose function if provided
        }
        window.history.back(); // Navigate back to the previous page
    };

    return (
        <div className="error-modal-overlay">
            <div className="error-modal">
                <h2>Error</h2>
                <p>{message}</p>
                <button
                    className="error-modal-button"
                    onClick={handleClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ErrorModal;
