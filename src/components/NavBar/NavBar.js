import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useGlobalContextLogin } from "../../layouts/useContext";
import UserInfoModal from "../UserInfo/UserInfoModal";
import "./NavBar.css";

function Navbar() {
  const { formLogin, setFormLogin, user } = useGlobalContextLogin();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false); 
  const navigate = useNavigate();

  const handleLogout = () => {
    setFormLogin(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); 
  };

  const openUserInfo = () => {
    setIsDropdownOpen(false); 
    setIsUserInfoOpen(true); 
  };

  const closeUserInfo = () => {
    setIsUserInfoOpen(false); 
  };
  

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">SmartBook</Link>
        </div>
        <div className="nav-links">
          <NavLink exact to="/" activeClassName="active-link">
            Home
          </NavLink>
          <NavLink to="/library" activeClassName="active-link">
            Library
          </NavLink>
          <NavLink to="/create" activeClassName="active-link">
            Create
          </NavLink>
          <NavLink to="/about" activeClassName="active-link">
            About
          </NavLink>
        </div>
        <div className="nav-right">
          <form className="nav-search-container">
            <input
              type="text"
              className="nav-search"
              placeholder="Search books..."
              aria-label="Search books"
            />
          </form>
          {formLogin && user ? (
            <div className="user-info"onMouseEnter={() => setIsDropdownOpen(true)} 
  onMouseLeave={() => setIsDropdownOpen(false)}>
              <div className="user-avatar-container" onClick={toggleDropdown}>
                <img
                  src={`/images/user.png`}
                  alt="User Avatar"
                  className="user-avatar"
                />
                <span className="user-name">{user.name}</span>
              </div>
              {isDropdownOpen && (
                <div className="user-dropdown">
                  <ul>
                    <li onClick={openUserInfo}>User Information</li>
                    <li>
                    <Link to="/history">Reading History</Link>
                    </li>
                    <li>
                    <Link to="/favorite">Favorite Books</Link>
                    </li>
                    <li className="logout" onClick={handleLogout}>Log out</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-sign">
                Sign In
              </Link>
              <Link to="/register" className="nav-sign">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {}
      <UserInfoModal
        isOpen={isUserInfoOpen}
        onClose={closeUserInfo}
        user={user}
      />
    </>
  );
}

export default Navbar;
