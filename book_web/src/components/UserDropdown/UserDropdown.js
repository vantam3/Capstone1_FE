import React from "react";
import { Link } from "react-router-dom";
import "./UserDropdown.css"; // Đảm bảo bạn đã tạo file CSS cho dropdown

function UserDropdown({ user, handleLogout }) {
  return (
    <div className="user-dropdown">
      <div className="user-dropdown-item">
        <strong>{user.first_name} {user.last_name}</strong>
      </div>
      <div className="user-dropdown-item">
        <Link to="/user-profile">Profile</Link> {/* Link đến trang hồ sơ người dùng */}
      </div>
      <div className="user-dropdown-item">
        <Link to="/reading-history">Reading History</Link> {/* Link đến lịch sử đọc */}
      </div>
      <div className="user-dropdown-item">
        <Link to="/favorite-books">Favorite Books</Link> {/* Link đến sách yêu thích */}
      </div>
    </div>
  );
}

export default UserDropdown;
