import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
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
                    <input type="text" className="nav-search" placeholder="Search..." />
                </div>
                <Link to="/login" className="nav-sign">Sign In</Link>
                <Link to="/register" className="nav-sign">Sign Up</Link>
            </div>
        </nav>
    );
}

export default Navbar;
