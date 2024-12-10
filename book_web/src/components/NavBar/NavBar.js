<<<<<<< HEAD
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useGlobalContextLogin } from "../../layouts/useContext";

const Navbar = () => {
  const { user, setFormLogin, setUser } = useGlobalContextLogin();
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
  const [message, setMessage] = useState(""); // Nội dung thông báo
=======
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useGlobalContextLogin } from "../../layouts/useContext"; // Import context để quản lý trạng thái đăng nhập
import axios from "axios"; // Import axios để gọi API
import Modal from "../../components/Modal/Modal"; // Import Modal

function Navbar() {
  const { user, setFormLogin, setUser } = useGlobalContextLogin(); // Lấy thông tin từ context
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    type: "success",
  }); // Nội dung của modal
  const [searchResults, setSearchResults] = useState([]); // Lưu kết quả tìm kiếm
  const [searchQuery, setSearchQuery] = useState(""); // Lưu từ khóa tìm kiếm
  const navigate = useNavigate();
  const searchRef = useRef(null); // Dùng để xử lý ẩn kết quả khi click ra ngoài

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]); // Ẩn danh sách kết quả khi click ra ngoài
        setShowModal(false); // Ẩn modal nếu đang hiển thị
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
>>>>>>> e234713109be83c1ae66487202dd4088f2a3ce7b

  const handleLogout = () => {
    // Xóa token khỏi LocalStorage
    localStorage.removeItem("token");

    // Đặt trạng thái đăng xuất
    setUser(null);
    setFormLogin(false);

<<<<<<< HEAD
    // Hiển thị modal thông báo đăng xuất thành công
    setMessage("Logout successful!");
    setShowModal(true);

    // Tự động đóng modal sau 1 giây
    setTimeout(() => {
      setShowModal(false);
    }, 1000);
=======
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

  const handleSearch = async (e) => {
    if (e.key !== "Enter") return; // Chỉ kích hoạt tìm kiếm khi nhấn Enter
    e.preventDefault();

    if (!searchQuery.trim()) {
      setModalContent({
        title: "Error",
        message: "Please enter a keyword to search.",
        type: "error",
      });
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/api/search-books/?q=${searchQuery}`
      );
      setSearchResults(response.data); // Lưu kết quả tìm kiếm
    } catch (error) {
      setModalContent({
        title: "Not Found",
        message: "No books or authors match your search query.",
        type: "error",
      });
      setShowModal(true);
      setSearchResults([]); // Đặt kết quả tìm kiếm rỗng nếu không tìm thấy
    }
>>>>>>> e234713109be83c1ae66487202dd4088f2a3ce7b
  };

  return (
    <nav className="navbar" ref={searchRef}>
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
<<<<<<< HEAD
=======
        <div className="nav-search-container">
          <input
            type="text"
            className="nav-search"
            placeholder="Search books or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch} // Xử lý tìm kiếm khi nhấn Enter
          />
        </div>
        {searchResults.length > 0 && (
          <div className="search-results">
            <ul>
              {searchResults.map((book) => (
                <li key={book.id}>
                  <Link to={`/book/${book.id}`}>{book.title} by {book.author}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
>>>>>>> e234713109be83c1ae66487202dd4088f2a3ce7b
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

<<<<<<< HEAD
      {/* Modal hiển thị đăng xuất thành công */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal success">
            <h3>Success</h3>
            <p>{message}</p>
          </div>
        </div>
=======
      {/* Sử dụng Modal */}
      {showModal && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          onClose={() => setShowModal(false)}
          type={modalContent.type}
        />
>>>>>>> e234713109be83c1ae66487202dd4088f2a3ce7b
      )}
    </nav>
  );
};

export default Navbar;
