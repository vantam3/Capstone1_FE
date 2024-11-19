import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

// Import Admin layout và các trang admin
import AdminLayout from './Admin/AdminLayout';
import AdminDashboard from './Admin/AdminDashboard';
import ManageUsers from './Admin/ManageUsers';
import ManageProducts from './Admin/ManageProducts';
import ViewReports from './Admin/ViewReports';
import Logout from './Admin/Logout';

// Component Wrapper để kiểm tra và hiển thị Navbar
const LayoutWrapper = ({ children }) => {
    const location = useLocation();
    // Kiểm tra nếu đường dẫn bắt đầu bằng '/admin', ẩn Navbar
    const hideNavbar = location.pathname.startsWith('/admin');
    return (
        <>
            {!hideNavbar && <Navbar />}
            <div className="app-container">{children}</div>
        </>
    );
};

function App() {
    return (
        <Router>
            <LayoutWrapper>
                <Routes>
                    {/* Các route chính */}
                    <Route path="/" element={<Home />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/create" element={<CreateBook />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/recover" element={<Recover />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/category/:categoryName" element={<CategoryDetail />} />
                    <Route path="/book/:bookId" element={<BookDetail />} /> 
                    <Route path="/read/:bookId" element={<ReadBook />} />
                    <Route path="/about" element={<About />} />

                    {/* Route admin */}
                    <Route path="/admin/*" element={<AdminLayout />}>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="manage-users" element={<ManageUsers />} />
                        <Route path="manage-products" element={<ManageProducts />} />
                        <Route path="view-reports" element={<ViewReports />} />
                        <Route path="logout" element={<Logout />} />
                    </Route>
                </Routes>
            </LayoutWrapper>
        </Router>
    );
}

export default App;
