import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useGlobalContextLogin } from "../../layouts/useContext";
import './NavBar.css';

function Navbar() {
    const { formLogin, setFormLogin, user } = useGlobalContextLogin();
    const navigate = useNavigate(); 

    
    const handleLogout = () => {
        setFormLogin(false);
        navigate("/"); 
        
    };

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">SmartBook</Link>
            </div>
            <div className="nav-links">
                <NavLink exact to="/" activeClassName="active-link">Home</NavLink>
                <NavLink to="/library" activeClassName="active-link">Library</NavLink>
                <NavLink to="/create" activeClassName="active-link">Create</NavLink>
                <NavLink to="/about" activeClassName="active-link">About</NavLink>
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
                    <div className="user-info">
                        <img src={`/images/user.png`} alt="User Avatar" className="user-avatar" />
                        <span className="user-name">{user.name}</span>
                        <button onClick={handleLogout} className="logout-button">
                            Log Out
                        </button>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="nav-sign">Sign In</Link>
                        <Link to="/register" className="nav-sign">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
