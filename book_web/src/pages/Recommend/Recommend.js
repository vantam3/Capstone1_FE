import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Recommend.css";

  const RecommendationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [topBooks, setTopBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch books data from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/books");
        const data = await response.json();
        setFilteredBooks(data); // Default set to all books
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setIsLoading(false);
      }
    };

    const fetchTopBooks = async () => {
      try {
        const response = await fetch("/api/top-books");
        const data = await response.json();
        setTopBooks(data);
      } catch (error) {
        console.error("Failed to fetch top favorite books:", error);
      }
    };

    fetchBooks();
    fetchTopBooks();
  }, []);

  const handleSearch = () => {
    if (!searchTerm) {
      return setFilteredBooks([]);
    }

    // Filter books based on search term
    const filtered = filteredBooks.filter((book) =>
      [book.title, book.author, book.summary].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredBooks(filtered);
  };

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="recommendations-container">
      <h1 className="recommendations-title">Find Books Based on Your Preferences</h1>
      <p>Describe your preferences, and we'll find books you'll love!</p>

      {/* Search Bar */}
      <div className="search-bar">
        <textarea
          placeholder="Enter your preferences..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          rows="4"
        />
        <button onClick={handleSearch}>Find Books</button>
      </div>

      {/* Book List */}
      <div className="book-list">
        {isLoading ? (
          <p>Loading books...</p>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <img
                src={book.image}
                alt={book.title}
                className="book-image"
                onClick={() => handleBookClick(book.id)}
                style={{ cursor: "pointer" }}
              />
              <div className="book-info">
                <h3>{book.title}</h3>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>Genre:</strong> {book.genre}
                </p>
                <p>
                  <strong>Summary:</strong> {book.summary}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No books found. Try describing your preferences differently.</p>
        )}
      </div>

      {/* Top Favorite Books */}
      <div className="top-favorites-container">
        <h1 className="top-favorites-title">Top Favorite Books</h1>
        <p className="introduction">
          This section highlights the most loved books by readers. These books are highly rated for their exceptional content and impact. Explore the top-rated books and discover your next favorite read!
        </p>

        <div className="book-carousel-wrapper">
          <div className="book-carousel">
            {topBooks.map((book) => (
              <div
                key={book.id}
                className="book-card"
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <img src={book.image} alt={book.title} className="book-image" />
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <span className="rating">Rating: {book.rating}/5</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
