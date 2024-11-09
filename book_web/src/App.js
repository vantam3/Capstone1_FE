import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Library from './pages/Library/Library';
import CreateBook from './pages/CreateBook';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register'; // Đảm bảo đường dẫn tới Register là đúng
import CategoryDetail from './pages/CategoryDetail/CategoryDetail';
import BookDetail from './pages/BookDetail/BookDetail'; // Import BookDetail component
import ReadBook from './pages/ReadBook/ReadBook'; // Import ReadBook component


function App() {
    return (
        <Router>
            <Navbar />
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/create" element={<CreateBook />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/category/:categoryName" element={<CategoryDetail />} />
                    <Route path="/book/:bookId" element={<BookDetail />} /> {/* Route cho BookDetail */}
                    <Route path="/read/:bookId" element={<ReadBook />} /> {/* Route cho ReadBook */}

                    

                </Routes>
            </div>
        </Router>
    );
}

export default App;
