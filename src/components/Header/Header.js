import React from "react";
import "./Header.css";
import { useGlobalContextLoin } from "../../layouts/useContext";

const Header = () => {
  const { formLogin } = useGlobalContextLoin();
  return (
    <header className="demo">
      <div className="header-logo">
        <a href="/">
          <img src="../../assets/images/LOGO_BOOKQUEST.png" alt="Logo" />
        </a>
      </div>
      <nav className="header-nav">
        <ul className="nav-links">
          <li>
            <a href="/">HOME</a>
          </li>
          <li>
            <a href="/library">LIBRARY</a>
          </li>
          <li>
            <a href="#readers-feelings">CREATE BOOKS</a>
          </li>
          <li>
            
            <a href="#readers-feelings">ABOUT</a>
          </li>
        </ul>
      </nav>
      {formLogin === true ? (
        <img
          src={"../../assets/images/images.png"}
          alt="logo"
          className="logo-name"
        />
      ) : (
        <div className="demo-buttons">
          <a href="/login" className="demo_login">
            Sign In
          </a>
          <a href="/register" className="demo_signup">
            Sign Up
          </a>
        </div>
      )}

      <div className="demosearch-bar">
        <input className="demo-bar" type="text" placeholder="Search..." />

        <button>🔍</button>
      </div>
    </header>
  );
};

export default Header;
