import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useGlobalContextLogin } from "../../layouts/useContext"; // Import context để quản lý trạng thái đăng nhập
import axios from "axios"; // Import axios để gọi API
import Modal from "../../components/Modal/Modal"; // Import Modal
import UserDropdown from "../../components/UserDropdown/UserDropdown"; // Thêm dòng này

function Navbar() {
  const { user, setFormLogin, setUser } = useGlobalContextLogin(); // Lấy thông tin từ context
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Thêm dòng này
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    type: "success",
  }); // Nội dung của modal
  const [searchResults, setSearchResults] = useState([]); // Lưu kết quả tìm kiếm
  const [searchQuery, setSearchQuery] = useState(""); // Lưu từ khóa tìm kiếm
  const navigate = useNavigate();
  const searchRef = useRef(null); // Dùng để xử lý ẩn kết quả khi click ra ngoài

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle trạng thái dropdown
  };

  // Khôi phục trạng thái đăng nhập từ LocalStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Lưu trạng thái user vào LocalStorage khi user thay đổi
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]); // Ẩn danh sách kết quả khi click ra ngoài
        setShowModal(false); // Ẩn modal nếu đang hiển thị
        setIsDropdownOpen(false); // Đóng dropdown khi click ngoài
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Gọi API logout tới backend
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        await axios.post("http://localhost:8000/api/logout/", {
          refresh_token: refreshToken,
        });
      }

      // Xóa token và thông tin user khỏi LocalStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");

      // Đặt trạng thái đăng xuất
      setUser(null);
      setFormLogin(false);

      // Hiển thị modal thông báo đăng xuất thành công
      setModalContent({
        title: "Success",
        message: "You have successfully logged out!",
        type: "success",
      });

      // Sử dụng setTimeout để đảm bảo trạng thái modal hiển thị chính xác
      setTimeout(() => {
        setShowModal(true);
      }, 0);
    } catch (err) {
      console.error("Logout error:", err);

      // Hiển thị modal thông báo lỗi
      setModalContent({
        title: "Error",
        message: "Error occurred during logout. Please try again.",
        type: "error",
      });

      // Sử dụng setTimeout để đảm bảo trạng thái modal hiển thị chính xác
      setTimeout(() => {
        setShowModal(true);
      }, 0);
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
        <Link to="/recommend">Recommend Books</Link>
      </div>
      <div className="nav-right">
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
                  <Link to={`/book/${book.id}`}>
                    {book.title} by {book.author}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {user ? (
          // Khi đã đăng nhập, hiển thị thông tin người dùng và nút Logout
          <div className="nav-user-info">
            <img
              src="/images/user.png" // Ảnh mặc định cho người dùng
              alt="User Avatar"
              className="nav-user-avatar"
              onClick={toggleDropdown} // Thêm onClick để mở/đóng dropdown
            />
            <span className="nav-user-name">
              {user.first_name} {user.last_name}
            </span>
            {isDropdownOpen && (
              <UserDropdown user={user} handleLogout={handleLogout} /> // Hiển thị dropdown khi isDropdownOpen là true
            )}
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
          onClose={() => setShowModal(false)}
          type={modalContent.type}
        />
      )}
    </nav>
  );
}

export default Navbar;
