import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Library from './pages/Library/Library';
import LoginForm from './pages/Login/Login'; 
import Recover from './pages/Recover/Recover';
import Register from './pages/Register/Register';
import CategoryDetail from './pages/CategoryDetail/CategoryDetail';
import BookDetail from './pages/BookDetail/BookDetail';
import ReadBook from './pages/ReadBook/ReadBook';
import { FormLoginProvider } from './layouts/useContext'; 
import CreateBook from './pages/CreateBook/createbook';
import ReadingHistory from "./pages/history/ReadingHistory";
import FavoriteBooks from "./pages/favorite/FavoriteBooks";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        
        <FormLoginProvider>
            <Router>
                <Navbar />
                <div className="app-container">
                {/* <button onClick={() => setIsModalOpen(true)}>View Reading History</button> */}
      {isModalOpen && (
        <ReadingHistory onClose={() => setIsModalOpen(false)} />
      )}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/library" element={<Library />} />
                        <Route path="/create" element={<CreateBook />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/recover" element={<Recover />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/category/:categoryName" element={<CategoryDetail />} />
                        <Route path="/book/:bookId" element={<BookDetail />} />
                        <Route path="/read/:bookId" element={<ReadBook />} />
                        <Route path="/history" element={<ReadingHistory />} />
                        <Route path="/favorite" element={<FavoriteBooks />} />
                    </Routes>
                </div>
            </Router>
        </FormLoginProvider>
    );
}

export default App;
