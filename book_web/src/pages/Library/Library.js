import React, { useEffect, useState } from 'react';
import './Library.css';
import { useNavigate } from 'react-router-dom';

function Library() {
    const [libraryData, setLibraryData] = useState([]); // Dữ liệu sách
    const [favorites, setFavorites] = useState([]); // Danh sách yêu thích
    const [selectedCategory, setSelectedCategory] = useState(''); // Thể loại được chọn
    const navigate = useNavigate();

    // Hàm gọi API lấy dữ liệu từ backend
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('https://your-api-endpoint.com/books'); // Đường dẫn API
                const data = await response.json();

                // Phân loại dữ liệu theo thể loại
                const categorizedBooks = data.reduce((acc, book) => {
                    const category = book.category || 'Uncategorized';
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(book);
                    return acc;
                }, {});

                const formattedData = Object.entries(categorizedBooks).map(([category, books]) => ({
                    category,
                    books,
                }));

                setLibraryData(formattedData);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    // Hàm bật/tắt yêu thích
    const toggleFavorite = (bookId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(bookId)
                ? prevFavorites.filter((id) => id !== bookId) // Xóa khỏi yêu thích nếu đã có
                : [...prevFavorites, bookId] // Thêm vào yêu thích nếu chưa có
        );
    };

    return (
        <div className="library-container">
            <h1 className="library-title">Explore Book Categories</h1>
            <div className="search-bar">
                <form className="search-form">
                    <select
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        value={selectedCategory}
                    >
                        <option value="">All Categories</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-fiction">Non-fiction</option>
                        <option value="Science">Science</option>
                        <option value="History">History</option>
                        <option value="Philosophy">Philosophy</option>
                        <option value="Biography">Biography</option>
                        <option value="Fantasy">Fantasy</option>
                    </select>
                </form>
            </div>

            {libraryData.map((categoryData) => (
                <div key={categoryData.category} className="category-section">
                    <h2>{categoryData.category}</h2>
                    <div className="book-list">
                        {categoryData.books.map((book) => (
                            <div key={book.id} className="book-card">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="book-image"
                                />
                                <div className="book-info">
                                    <h3>{book.title}</h3>
                                    <p>{book.description}</p>
                                </div>
                                <div
                                    className={`favorite-icon ${favorites.includes(book.id) ? 'favorited' : ''}`}
                                    onClick={() => toggleFavorite(book.id)}
                                >
                                    {favorites.includes(book.id) ? '❤️' : '🤍'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Library;
