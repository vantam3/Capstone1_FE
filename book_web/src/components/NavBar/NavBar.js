import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">SmartBook</Link>
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/library">Thư viện</Link>
                <Link to="/create">Tạo sách</Link>
                <Link to="/login">Đăng nhập</Link>
                <Link to="/Register">Đăng ký</Link>
            </div>
            <div className="nav-search-container">
                <input type="text" className="nav-search" placeholder="Tìm kiếm sách..." />
            </div>
        </nav>
    );
}

export default Navbar;
