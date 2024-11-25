import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useGlobalContextLogin } from "../../layouts/useContext"; // Import context để quản lý trạng thái đăng nhập
import axios from "axios"; // Import axios để gọi API logout
import Modal from "../../components/Modal/Modal"; // Import Modal

function Navbar() {
  const { user, setFormLogin, setUser } = useGlobalContextLogin(); // Lấy thông tin từ context
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    type: "success",
  }); // Nội dung của modal

  const handleLogout = async () => {
    try {
      // Gọi API logout tới backend
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        await axios.post("http://localhost:8000/api/logout/", {
          refresh_token: refreshToken,
        });
      }

      // Xóa token khỏi LocalStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");

      // Đặt trạng thái đăng xuất
      setUser(null);
      setFormLogin(false);

      // Hiển thị modal thông báo đăng xuất thành công
      setModalContent({
        title: "Success",
        message: "You have successfully logged out!",
        type: "success",
      });
      setShowModal(true);
    } catch (err) {
      console.error("Logout error:", err);
      setModalContent({
        title: "Error",
        message: "Error occurred during logout. Please try again.",
        type: "error",
      });
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false); // Đóng modal
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
        <div className="nav-search-container">
          <input type="text" className="nav-search" placeholder="Tìm kiếm sách..." />
        </div>
        {user ? (
          // Khi đã đăng nhập, hiển thị thông tin người dùng và nút Logout
          <div className="nav-user-info">
            <img
              src="/images/user.png" // Ảnh mặc định cho người dùng
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
          // Khi chưa đăng nhập, hiển thị nút Sign In và Sign Up
          <>
            <Link to="/login" className="nav-sign">Sign In</Link>
            <Link to="/register" className="nav-sign">Sign Up</Link>
          </>
        )}
      </div>

      {/* Sử dụng Modal */}
      {showModal && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          onClose={closeModal}
          type={modalContent.type}
        />
      )}
    </nav>
  );
}

export default Navbar;
