import React from "react";
import { FaBookOpen, FaLightbulb } from "react-icons/fa";
import "./HomePage.css";
import Header from "../components/Header/Header";
const HomePage = () => {
  return (
    <div className="section-container" style={{ backgroundColor: "#ffebcd" }}>
      <div>
        
        {/* <header className="header">
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
        </header> */}
        <Header/>
      </div>
      <div className="body">
        <h1>
          <FaLightbulb /> WHAT IS YOUR READING INTEREST??? <FaBookOpen />
        </h1>
        <p>
          Children’s books, psychology, romance, religion, science, story
          books....
        </p>
        <div className="book-covers">
          <img
            src={'../../assets/images/Chuchim.png'}
            alt="Chú chim tí hon"
          />
          <img
            src={'../../assets/images/Doivannam.jpg'}
            alt="Đợi vãn năm"
          />
          <img
            src={'../../assets/images/Macdep.png'}
            alt="Thao Túng Tâm Lý"
          />
          <img
            src={'../../assets/images/Thanhgiong.jpg'}
            alt="Thánh Gióng"
          />
          <img
            src={'../../assets/images/Dieukydieu.jpg'}
            alt="Điều kì diệu của tiệm tạp hóa NAMIYA"
          />
        </div>
      </div>

      <footer className="footer">
        <button>Explore Now</button>
      </footer>
    </div>
  );
};

export default HomePage;
