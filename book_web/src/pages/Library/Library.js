import React, { useEffect, useState } from 'react';
import './Library.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Library() {
    const [libraryData, setLibraryData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem('token'); // Lấy token từ localStorage

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/favorites/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFavorites(response.data.map((book) => book.id)); // Lưu danh sách ID sách yêu thích
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };
    
        if (token) fetchFavorites();
    }, [token]);
    

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/books/');
                const books = response.data;

                if (!books || books.length === 0) {
                    setError("No books found.");
                    setLoading(false);
                    return;
                }

                const categorizedBooks = books.reduce((acc, book) => {
                    const genres = book.genres.length > 0 ? book.genres : ["Uncategorized"];
                    genres.forEach((genre) => {
                        if (!acc[genre]) {
                            acc[genre] = [];
                        }
                        acc[genre].push(book);
                    });
                    return acc;
                }, {});

                const formattedData = Object.entries(categorizedBooks).map(([genre, books]) => ({
                    genre,
                    books,
                }));

                setLibraryData(formattedData);
                setSortedData(formattedData);
            } catch (error) {
                setError("Failed to fetch books data.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleGenreChange = (event) => {
        const genre = event.target.value;
        setSelectedGenre(genre);

        if (genre === '') {
            setSortedData(libraryData);
        } else {
            const filteredData = libraryData.filter((genreData) => genreData.genre === genre);
            setSortedData(filteredData);
        }
    };

    const toggleFavorite = async (bookId, e) => {
        e.stopPropagation(); // Ngừng sự kiện lan truyền khi nhấp vào biểu tượng yêu thích
    
        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'Please log in to add or remove favorites',
                showConfirmButton: true,
            });
            navigate("/login");
            return;
        }
    
        try {
            if (favorites.includes(bookId)) {
                // Nếu đã yêu thích, xóa khỏi yêu thích
                await axios.post(
                    'http://localhost:8000/api/favorites/remove_from_favorites/',
                    { book_id: bookId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setFavorites(favorites.filter((id) => id !== bookId)); // Cập nhật state
                Swal.fire({
                    icon: 'success',
                    title: 'Book removed from favorites!',
                });
            } else {
                // Nếu chưa yêu thích, thêm vào yêu thích
                await axios.post(
                    'http://localhost:8000/api/favorites/add_to_favorites/',
                    { book_id: bookId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setFavorites([...favorites, bookId]);  // Cập nhật lại danh sách yêu thích
                Swal.fire({
                    icon: 'success',
                    title: 'Book added to favorites!',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: 'Please try again later.',
            });
        }
    };
    

    if (loading) {
        return <div className="library-loading">Loading books...</div>;
    }

    if (error) {
        return <div className="library-error">{error}</div>;
    }

    return (
        <div className="library-container">     
            <h1 className="library-title">Explore Book Categories</h1>

            <div className="library-sort-container">
                <label htmlFor="genre-sort">Sort by Genre: </label>
                <select
                    id="genre-sort"
                    value={selectedGenre}
                    onChange={handleGenreChange}
                    className="library-genre-select"
                >
                    <option value="">All</option>
                    {libraryData.map((genreData) => (
                        <option key={genreData.genre} value={genreData.genre}>
                            {genreData.genre}
                        </option>
                    ))}
                </select>
            </div>

            {sortedData.map((genreData) => (
                <div key={genreData.genre} className="library-category-section">
                    <h2 className="library-genre-title">{genreData.genre}</h2>
                    <div className="library-book-list">
                        {genreData.books.map((book) => (
                            <div
                                key={book.id}
                                className="library-book-card"
                                onClick={() => navigate(`/book/${book.id}`)}
                            >
                                <div
                                    className={`favorite-icon ${favorites.includes(book.id) ? 'favorited' : ''}`}
                                    onClick={(e) => toggleFavorite(book.id, e)}
                                >
                                {Array.isArray(favorites) && favorites.includes(book.id) ? '❤️' : '🤍'}
                            </div>

                                {book.image ? (
                                    <img src={book.image} alt={book.title} className="library-book-image" />
                                ) : (
                                    <div className="no-image">No Image Available</div>
                                )}
                                <div className="library-book-info">
                                    <h3>{book.title}</h3>
                                    <p><strong>Author:</strong> {book.author || "Unknown Author"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        className="library-see-more-button"
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