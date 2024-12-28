import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Library from './pages/Library/Library';
import CreateBook from './pages/CreateBook/CreateBook';
import Login from './pages/Login/Login';
import Recover from './pages/Recover/Recover';
import Register from './pages/Register/Register'; 
import CategoryDetail from './pages/CategoryDetail/CategoryDetail';
import BookDetail from './pages/BookDetail/BookDetail'; 
import ReadBook from './pages/ReadBook/ReadBook'; 
import About from './pages/About/About'; 
import Recommend from './pages/Recommend/Recommend'; 
import Profile from "./pages/Profile/Profile";
import ReadingHistory from "./pages/ReadingHistory/ReadingHistory";
import FavoriteBooks from "./pages/FavoriteBooks/Favorite";

// Import Admin layout and pages
import AdminLayout from './Admin/AdminLayout';
import AdminDashboard from './Admin/AdminDashboard';
import ManageUsers from './Admin/ManageUsers';
import ManageProducts from './Admin/ManageProducts';
import ViewReports from './Admin/ViewReports';
import Logout from './Admin/Logout';

function UnauthorizedModal({ message }) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.location.href = '/'; // Redirect to home after 5 seconds
        }, 5000);
        return () => clearTimeout(timeout); // Cleanup timeout on component unmount
    }, []);

    return (
        <div className="error-modal-overlay">
            <div className="error-modal">
                <h2>Access Denied</h2>
                <p>{message}</p>
                <button
                    className="error-modal-button"
                    onClick={() => {
                        window.location.href = '/'; // Redirect immediately on button click
                    }}
                >
                    Go Home
                </button>
            </div>
        </div>
    );
}

function App() {
    const [isSuperuser, setIsSuperuser] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Check admin permissions
            fetch('http://localhost:8000/api/admin_dashboard/', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.message === 'Welcome Admin!') {
                        setIsSuperuser(true);
                    } else {
                        setErrorMessage(data.error || 'Unauthorized access.');
                        setIsSuperuser(false);
                    }
                })
                .catch(() => setErrorMessage('Unable to verify admin status.'))
                .finally(() => setAuthChecked(true));
        } else {
            setAuthChecked(true);
        }
    }, []);

    if (!authChecked) {
        return null; // Wait until authentication check is complete
    }
    
    return (
        <Router>
            <Navbar />
            <div className="app-container">
                <Routes>
                    {/* Main routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/recommendations" element={<Recommend />} />
                    <Route path="/create" element={<CreateBook />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/recover" element={<Recover />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/genre/:categoryName" element={<CategoryDetail />} />
                    <Route path="/book/:bookId" element={<BookDetail />} /> 
                    <Route path="/read/:bookId" element={<ReadBook />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/recommend" element={<Recommend />} /> 
                    <Route path="/user-profile" element={<Profile />} />
                    <Route path="/reading-history" element={<ReadingHistory />} />
                    <Route path="/favorite-books" element={<FavoriteBooks />} />
                    {/* Admin routes */}
                    <Route
                        path="/admin/*"
                        element={
                            isSuperuser ? (
                                <AdminLayout />
                            ) : (
                                <UnauthorizedModal
                                    message={errorMessage || 'You are not authorized to access the admin area.'}
                                />
                            )
                        }
                    >
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="manage-users" element={<ManageUsers />} />
                        <Route path="manage-products" element={<ManageProducts />} />
                        <Route path="view-reports" element={<ViewReports />} />
                        <Route path="logout" element={<Logout />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
