import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AdminLayout.css';
import './Logout.css'; // Import the Logout CSS for confirmation dialog

const AdminSidebar = () => {
    const [showConfirm, setShowConfirm] = useState(false); // Manage logout confirmation dialog

    const handleLogout = () => {
        // Simulate logout action
        localStorage.removeItem('token'); // Remove token from storage
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        setShowConfirm(false); // Close confirmation dialog
        window.location.href = '/'; // Redirect to home page
    };

    return (
        <div className="admin-sidebar">
            <h2>ADMIN BOOKQUEST</h2>
            <nav>
                <NavLink to="/admin/dashboard" activeClassName="active-link">Dashboard</NavLink>
                <NavLink to="/admin/manage-users" activeClassName="active-link">Manage Users</NavLink>
                <NavLink to="/admin/manage-products" activeClassName="active-link">Manage Books</NavLink>
                <NavLink to="/admin/view-reports" activeClassName="active-link">View Reports</NavLink>
                {/* Logout Button Styled Like NavLink */}
                <button
                    className="logout-navlink" // Styled to match NavLink
                    onClick={() => setShowConfirm(true)} // Show confirmation dialog
                >
                    Log Out
                </button>
            </nav>

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
                                onClick={() => setShowConfirm(false)} // Close confirmation dialog
                            >
                                Naah, Just Kidding
                            </button>
                            <button
                                className="confirm-button"
                                onClick={handleLogout} // Perform logout action
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

export default AdminSidebar;
