import React, { useState } from 'react';
import './Logout.css';

const Logout = () => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleLogout = () => {
        alert('You have successfully logged out.');
        // Chuyển hướng hoặc xử lý thêm logic tại đây
        window.location.href = '/';
    };

    return (
        <div className="logout-container">
            <h2>Log Out</h2>
            <button
                className="logout-button"
                onClick={() => setShowConfirm(true)}
            >
                Log Out
            </button>

            {showConfirm && (
                <div className="confirm-dialog">
                    <div className="dialog-content">
                        <div className="icon">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
                                alt="Logout Icon"
                            />
                        </div>
                        <h3>Oh no! You're leaving...</h3>
                        <p>Are you sure?</p>
                        <div className="dialog-buttons">
                            <button
                                className="cancel-button"
                                onClick={() => setShowConfirm(false)}
                            >
                                Naah, Just Kidding
                            </button>
                            <button
                                className="confirm-button"
                                onClick={handleLogout}
                            >
                                Yes, Log Me Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logout;
