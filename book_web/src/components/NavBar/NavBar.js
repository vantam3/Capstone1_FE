import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useGlobalContextLogin } from "../../layouts/useContext";

const Navbar = () => {
  const { user, setFormLogin, setUser } = useGlobalContextLogin();
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
  const [message, setMessage] = useState(""); // Nội dung thông báo

  const handleLogout = () => {
    // Xóa token khỏi LocalStorage
    localStorage.removeItem("token");

    // Đặt trạng thái đăng xuất
    setUser(null);
    setFormLogin(false);

    // Hiển thị modal thông báo đăng xuất thành công
    setMessage("Logout successful!");
    setShowModal(true);

    // Tự động đóng modal sau 1 giây
    setTimeout(() => {
      setShowModal(false);
    }, 1000);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">BookQuest</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/library">Library</Link>
        <Link to="/create">Create</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="nav-right">
        {user ? (
          <div className="nav-user-info">
            <img
              src="/images/user.png"
              alt="User Avatar"
              className="nav-user-avatar"
            />
            <span className="nav-user-name">
              {user.first_name} {user.last_name}
            </span>
            <button onClick={handleLogout} className="nav-logout-button">
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="nav-sign">Sign In</Link>
            <Link to="/register" className="nav-sign">Sign Up</Link>
          </>
        )}
      </div>

      {/* Modal hiển thị đăng xuất thành công */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal success">
            <h3>Success</h3>
            <p>{message}</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
