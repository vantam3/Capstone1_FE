import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CategoryDetail.css';

function CategoryDetail() {
    const { categoryName } = useParams(); // Lấy tên thể loại từ URL
    const navigate = useNavigate(); // Điều hướng
    const [categoryBooks, setCategoryBooks] = useState([]); // Dữ liệu sách theo thể loại
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi

    useEffect(() => {
        const fetchCategoryBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/books/');
                const books = response.data;

                // Lọc sách thuộc thể loại hiện tại
                const filteredBooks = books.filter((book) =>
                    book.genres.some((genre) => genre.toLowerCase() === categoryName.toLowerCase())
                );

                if (filteredBooks.length === 0) {
                    setError('No books found for this category.');
                } else {
                    setCategoryBooks(filteredBooks);
                }
            } catch (error) {
                console.error('Error fetching category books:', error);
                setError('Failed to fetch books for this category.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryBooks();
    }, [categoryName]);

    if (loading) {
        return <div className="loading">Loading books...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="category-detail-container">
            <h1>{categoryName} books</h1>
            <div className="book-list">
                {categoryBooks.map((book) => (
                    <div 
                        key={book.id}
                        className="book-card"
                        onClick={() => navigate(`/book/${book.id}`)} // Điều hướng đến trang chi tiết sách
                    >
                        <img src={book.image} alt={book.title} className="book-image" />
                        <div className="book-info">
                            <h3>{book.title}</h3>
                            <p><strong>Author:</strong> {book.author || 'Unknown Author'}</p>
                            <p>{book.summary || 'No description available.'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryDetail;
