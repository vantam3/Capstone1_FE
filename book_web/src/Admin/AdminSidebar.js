import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AdminLayout.css';
import './Logout.css'; // Import the Logout CSS for confirmation dialog
import { useGlobalContextLogin } from "../layouts/useContext";
import axios from "axios";
import Modal from "../components/Modal/Modal";

const AdminSidebar = () => {
    const [showConfirm, setShowConfirm] = useState(false); // Manage logout confirmation dialog
    const [modalVisible, setModalVisible] = useState(false); // Manage modal visibility
    const [modalContent, setModalContent] = useState({ title: "", message: "", type: "info" });
    const { user, setFormLogin, setUser } = useGlobalContextLogin();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem("refresh_token");
            if (refreshToken) {
                await axios.post("http://localhost:8000/api/logout/", {
                    refresh_token: refreshToken,
                });
            }

            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");

            setUser(null);
            setFormLogin(false);

            setModalContent({
                title: "Success",
                message: "You have successfully logged out!",
                type: "success",
            });

            setModalVisible(true);

            setTimeout(() => {
                navigate("/");
            }, 1000); 
        } catch (err) {
            console.error("Logout error:", err);

            setModalContent({
                title: "Error",
                message: "Error occurred during logout. Please try again.",
                type: "error",
            });

            setModalVisible(true);
        } finally {
            setShowConfirm(false); // Close confirmation dialog
        }
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

            {/* Confirmation Dialog */}
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

            {/* Modal for Logout Result */}
            {modalVisible && (
                <Modal
                    title={modalContent.title}
                    message={modalContent.message}
                    type={modalContent.type}
                    onClose={() => setModalVisible(false)}
                />
            )}
        </div>
    );
};

export default AdminSidebar;
