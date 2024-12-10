import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Library from './pages/Library/Library';
import RecommendationsPage from './pages/RecommendationsPage/RecommendationsPage';
import CreateBook from './pages/CreateBook/CreateBook';
import Login from './pages/Login/Login';
import Recover from './pages/Recover/Recover';
import Register from './pages/Register/Register'; 
import CategoryDetail from './pages/CategoryDetail/CategoryDetail';
import BookDetail from './pages/BookDetail/BookDetail'; 
import ReadBook from './pages/ReadBook/ReadBook'; 
import About from './pages/About/About'; 

// Import Admin layout và các trang admin
import AdminLayout from './Admin/AdminLayout';
import AdminDashboard from './Admin/AdminDashboard';
import ManageUsers from './Admin/ManageUsers';
import ManageProducts from './Admin/ManageProducts';
import ViewReports from './Admin/ViewReports';
import Logout from './Admin/Logout';

// Import Modal cho thông báo lỗi
import ErrorModal from './Admin/ErrorModal';

function App() {
    const [isSuperuser, setIsSuperuser] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Gửi yêu cầu kiểm tra quyền admin
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
        return null; 
    }
    
    return (
        <Router>
            <Navbar />
            <div className="app-container">
                <Routes>
                    {/* Các route chính */}
                    <Route path="/" element={<Home />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/recommendations" element={<RecommendationsPage />} />
                    <Route path="/create" element={<CreateBook />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/recover" element={<Recover />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/category/:categoryName" element={<CategoryDetail />} />
                    <Route path="/book/:bookId" element={<BookDetail />} /> 
                    <Route path="/read/:bookId" element={<ReadBook />} />
                    <Route path="/about" element={<About />} />

                    {/* Route admin */}
                    <Route
                        path="/admin/*"
                        element={
                            isSuperuser ? (
                                <AdminLayout />
                            ) : (
                                <ErrorModal
                                    message={errorMessage || 'You are not authorized to access the admin area.'}
                                    redirectTo="/"
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
