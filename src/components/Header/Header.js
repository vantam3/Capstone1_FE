import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="demo">
      <div className="header-logo">
        <a href="/">
          <img src="../../assets/images/LOGO_BOOKQUEST.png" alt="Logo" />
        </a>
      </div>
      <nav className="header-nav">
        <ul className="nav-links">
          {/* <li>
            <a href="/">HOME</a>
          </li> */}
          <li>
            <a href="#introduce">INTRODUCE</a>
          </li>
          <li className="dropdown">
            <p>BOOKS LIBRARY</p>
            <ul className="dropdown-content">
              <li className="dropdown-ebook">
                {/* <a className="ebooc-link" href="/sciencefiction"> */}
                <p className="ebooc-link"> Sách điện tử</p>
                {/* </a> */}
                <div className="dropdown-ebook-list">
                  <div className="ebook-list-item">
                    <div>
                      <a href="/versebook">Thơ -Tản văn</a>
                      <a href="/thovan">Tài chính cá nhân</a>
                      <a href="/thovan">Tâm lý giới tính</a>
                    </div>
                    <div>
                      <a href="/thovan">Thơ -Tản văn</a>
                      <a href="/thovan">Tài chính cá nhân</a>
                      <a href="/thovan">Tâm lý giới tính</a>
                    </div>
                    <div>
                      <a href="/thovan">Thơ -Tản văn</a>
                      <a href="/thovan">Tài chính cá nhân</a>
                      <a href="/thovan">Tâm lý giới tính</a>
                    </div>
                    <div>
                      <a href="/thovan">Thơ -Tản văn</a>
                      <a href="/thovan">Tài chính cá nhân</a>
                      <a href="/thovan">Tâm lý giới tính</a>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <a href="/romance">Romance</a>
              </li>
              <li>
                <a href="/mystery">Mystery</a>
              </li>
              <li>
                <a href="/fantasy">Fantasy</a>
              </li>
              <li>
                <a href="/biography">Biography</a>
              </li>
              <li>
                <a href="/history">History</a>
              </li>
              <li>
                <a href="/sefthelp">Seft-Help</a>
              </li>
              <li>
                <a href="/children’sbooks">Children’s Books</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#readers-feelings">READER'S FEELINGS</a>
          </li>
        </ul>
      </nav>

      <div className="demo-buttons">
        <a href="/login" className="demo_login">
          Sign In
        </a>
        <a href="/register" className="demo_signup">
          Sign Up
        </a>
      </div>
      <div className="demosearch-bar">
        <input className="demo-bar" type="text" placeholder="Search..." />

        <button>🔍</button>
      </div>
    </header>
  );
};

export default Header;
