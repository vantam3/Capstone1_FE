import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Recommend.css";

const RecommendationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [topBooks, setTopBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch top books on page load
  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await fetch("/api/top-books"); //top sach yeu thich nhat
        const data = await response.json();
        setTopBooks(data);
      } catch (error) {
        console.error("Failed to fetch top favorite books:", error);
      }
    };
  

    fetchTopBooks();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setFilteredBooks([]);
      return;
    }

    setIsLoading(true);

    try {
      // Gửi POST request tới API backend
      const response = await fetch("http://localhost:8000/api/recommend_books/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchTerm }), // Gửi searchTerm trong trường query
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations.");
      }

      const data = await response.json();
      setFilteredBooks(data); // Cập nhật danh sách sách gợi ý
      localStorage.setItem("recommendations", JSON.stringify(data)); // Lưu vào localStorage
    } catch (error) {
      console.error("Failed to fetch recommended books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="recommendations__container">
      <h1 className="recommendations__title">Find Books Based on Your Preferences</h1>
      <p className="recommendations__p">Describe your preferences, and we'll find books you'll love!</p>

      {/* Search Bar */}
      <div className="search__bar">
        <textarea
          placeholder="Enter your preferences..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          rows="4"
        />
        <button onClick={handleSearch}>Find Books</button>
      </div>

      {/* Book List */}
      <div className="book__list">
        {isLoading ? (
          <p>Loading recommendations...</p>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <img
                src={book.image}
                alt={book.title}
                className="book-card__image"
                onClick={() => handleBookClick(book.id)}
                style={{ cursor: "pointer" }}
              />
              <div className="book-card__info">
                <h3>{book.title}</h3>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                
                <p>
                  <strong>Similarity:</strong> {(book.similarity * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No books found. Try describing your preferences differently.</p>
        )}
      </div>

      {/* Top Favorite Books */}
      <div className="top-favorites__container">
        <h1 className="top-favorites__title">Top Favorite Books</h1>
        <p className="top-favorites__introduction">
          This section highlights the most loved books by readers. These books are highly rated for their exceptional content and impact. Explore the top-rated books and discover your next favorite read!
        </p>

        <div className="book-carousel__wrapper">
          <div className="book-carousel">
            {topBooks.map((book) => (
              <div
                key={book.id}
                className="book-card"
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <img src={book.image} alt={book.title} className="book-card__image" />
                <div className="book-card__info">
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <span className="book-card__rating">Rating: {book.rating}/5</span>
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