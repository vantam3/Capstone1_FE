import React from 'react';
import './ErrorModal.css'; 

const ErrorModal = ({ message }) => {
    return (
        <div className="error-modal-overlay">
            <div className="error-modal">
                <h2>Error</h2>
                <p>{message}</p>
                <button
                    className="error-modal-button"
                    onClick={() => {
                        window.location.href = '/'; 
                    }}
                >
                    Go Home
                </button>
            </div>
        </div>
    );
};

export default ErrorModal;

