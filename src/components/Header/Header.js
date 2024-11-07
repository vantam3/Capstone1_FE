import React from "react";
import { FaBookOpen, FaLightbulb } from "react-icons/fa";
import "./Header.css";
const Header = () => {
  return (
    <div className="section-container" style={{ backgroundColor: "#ffebcd" }}>
      <div>
       
        <header className="header">
          <div className="logo">
            <img src={"../../assets/images/LOGO_BOOKQUEST.png"} alt="Logo" />
          </div>
          <nav>
            <ul className="all">
              <li>
                <a href="#home">HOME</a>
              </li>
              <li>
                <a href="#introduce">INTRODUCE</a>
              </li>
              <li className="dropdown">
                <a href="#books-library">BOOKS LIBRARY</a>
                <ul className="dropdown-content">
                  <li>
                    <a href="/Science_Fiction">Science Fiction</a>
                  </li>
                  <li>
                    <a href="#non-fiction">Romance</a>
                  </li>
                  <li>
                    <a href="#fantasy">Mystery</a>
                  </li>
                  <li>
                    <a href="#science">Fantasy</a>
                  </li>
                  <li>
                    <a href="#science">Biography</a>
                  </li>
                  <li>
                    <a href="#science">History</a>
                  </li>
                  <li>
                    <a href="#science">Seft-Help</a>
                  </li>
                  <li>
                    <a href="#science">Children’s Books</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#readers-feelings">READER'S FEELINGS</a>
              </li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <a href="/login" className="Home_login">
              Sign In
            </a>
            <a href="/register" className="Home_signup">
              Sign Up
            </a>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button>🔍</button>
          </div>
        </header>


      </div>
      
    </div>
  );
};

export default Header;
