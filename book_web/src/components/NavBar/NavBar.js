import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useGlobalContextLogin } from "../../layouts/useContext";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import UserDropdown from "../../components/UserDropdown/UserDropdown";

function Navbar() {
  const { user, setFormLogin, setUser } = useGlobalContextLogin();
  const [showModal, setShowModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    type: "success",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Kiểm tra nếu đang ở trang admin
  const isAdminRoute = window.location.pathname.startsWith('/admin');

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
        setSearchResults([]);
        setShowModal(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

      setTimeout(() => {
        setShowModal(true);
        navigate("/login");
      }, 0);
    } catch (err) {
      console.error("Logout error:", err);

      setModalContent({
        title: "Error",
        message: "Error occurred during logout. Please try again.",
        type: "error",
      });

      setTimeout(() => {
        setShowModal(true);
      }, 0);
    }
  };

  const handleSearch = async (e) => {
    if (e.key !== "Enter") return;
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
      setSearchResults(response.data);
    } catch (error) {
      setModalContent({
        title: "Not Found",
        message: "No books or authors match your search query.",
        type: "error",
      });
      setShowModal(true);
      setSearchResults([]);
    }
  };

  // Không render Navbar nếu đang ở trang admin
  if (isAdminRoute) {
    return null;
  }

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
            onKeyDown={handleSearch}
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
          <div className="nav-user-info">
            <img
              src="/images/user.png"
              alt="User Avatar"
              className="nav-user-avatar"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            <span className="nav-user-name">
              {user.first_name} {user.last_name}
            </span>
            {isDropdownOpen && (
              <UserDropdown user={user} handleLogout={handleLogout} />
            )}
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
