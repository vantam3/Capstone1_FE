import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="demo">
      <div className="header-logo">
        <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="Logo" />
      </div>
      <nav className="header-nav">
        <ul className="nav-links">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/introduce">INTRODUCE</Link></li>
          <li><Link to="/books-library">BOOKS LIBRARY</Link></li>
          <li><Link to="/create-book">CREATE BOOKS ACCORDING TO YOUR IDEAS</Link></li> 
        </ul>
      </nav>
      <div className="demo-buttons">
        <Link to="/login" className="demo_login">Sign In</Link>
        <Link to="/register" className="demo_signup">Sign Up</Link> 
      </div>
      <div className="demosearch-bar">
        <input className="demo-bar" type="text" placeholder="Search..." />
      </div>
    </header>
  );
};

export default Header;
