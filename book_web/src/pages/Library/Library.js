import React, { useEffect, useState } from 'react';
import './Library.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Library() {
    const [libraryData, setLibraryData] = useState([]); // State để lưu trữ dữ liệu sách
    const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái loading
    const [error, setError] = useState(null); // State để kiểm tra lỗi
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    useEffect(() => {
        // Gọi API để lấy dữ liệu sách
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/books/');
                const books = response.data;

                // Kiểm tra nếu API không trả về dữ liệu
                if (!books || books.length === 0) {
                    setError("No books found.");
                    setLoading(false);
                    return;
                }

                // Phân loại sách theo genres (thể loại)
                const categorizedBooks = books.reduce((acc, book) => {
                    const genres = book.genres.length > 0 ? book.genres : ["Uncategorized"]; // Dùng "Uncategorized" nếu không có genres
                    genres.forEach((genre) => {
                        if (!acc[genre]) {
                            acc[genre] = [];
                        }
                        acc[genre].push(book);
                    });
                    return acc;
                }, {});

                // Định dạng lại dữ liệu cho phù hợp với `libraryData`
                const formattedData = Object.entries(categorizedBooks).map(([genre, books]) => ({
                    genre,
                    books,
                }));

                setLibraryData(formattedData); // Lưu dữ liệu vào state
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy dữ liệu sách:", error);
                setError("Failed to fetch books data.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks(); // Gọi hàm fetchBooks khi component được render
    }, []);

    // Hiển thị loading khi dữ liệu đang được tải
    if (loading) {
        return <div className="loading">Loading books...</div>;
    }

    // Hiển thị lỗi nếu có lỗi xảy ra
    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="library-container">
            <h1>Explore Book Genres</h1>
            {libraryData.map((genreData) => (
                <div key={genreData.genre} className="genre-section">
                    <h2 className="genre-title">{genreData.genre}</h2>
                    <div className="book-list">
                        {genreData.books.map((book) => (
                            <div 
                                key={book.id} 
                                className="book-card"
                                onClick={() => navigate(`/book/${book.id}`)} // Điều hướng đến trang chi tiết sách
                            >   
                                {/* Hiển thị ảnh sách nếu có */}
                                {book.image ? (
                                    <img src={book.image} alt={book.title} className="book-image" />
                                ) : (
                                    <div className="no-image">No Image Available</div>
                                )}
                                <div className="book-info">
                                    <h3>{book.title}</h3>
                                    <p><strong>Author:</strong> {book.author || "Unknown Author"}</p>
                                    {/* <p><strong>Summary:</strong> {book.summary || "No description available."}</p> */}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button 
                        className="see-more-button" 
                        onClick={() => navigate(`/genre/${genreData.genre.toLowerCase()}`)}
                    >
                        See More
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Library;
