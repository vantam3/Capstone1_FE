import React, { useState } from "react";
import "./UserInfoModal.css";

const UserInfoModal = ({ isOpen, onClose, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || { name: '', email: '' });
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close" onClick={onClose}>x</button>
          <h2>Error: User information not available</h2>
        </div>
      </div>
    );
  }

 const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!oldPassword) {
      alert("Please enter your current password.");
      return;
    }
    
    console.log("Old Password:", oldPassword);
    console.log("Saved user information:", { ...editedUser, newPassword: password });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setPassword("");
    setOldPassword("");
    setIsEditing(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close" onClick={onClose}>
        x
        </button>
        <h2>USER INFORMATION</h2>
        <div className="user-details">
          <img 
            src={user.avatar || process.env.PUBLIC_URL + '/images/user.png'} 
            alt="User Avatar" 
            className="user-avatar-large"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = process.env.PUBLIC_URL + '/images/user.png';
            }}
          />
          {isEditing ? (
            <div>
              <p>
                <strong>Name:</strong>{" "}
                <input
                  type="text"
                  name="name"
                  placeholder="Tên người dùng"
                  value={editedUser.name}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <input
                  type="email"
                  name="email"
                  placeholder="letrucphuongquynh03@gmail.com"
                  value={editedUser.email}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <strong>Current Password:</strong>{" "}
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                />
              </p>
              <p>
                <strong>New Password:</strong>{" "}
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </p>
            </div>
          ) : (
            <div className="infor">
              <p><strong>Name:</strong> {editedUser.name}</p>
              <p><strong>Email:</strong> {editedUser.email || "example@example.com"}</p>
            </div>
          )}
        </div>
        <div className="modal-actions">
          {isEditing ? (
            <>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;
