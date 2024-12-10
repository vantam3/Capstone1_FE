import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RecommendationsPage.css";

const RecommendationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [topBooks, setTopBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const mockBooks = [
      {
        id: 1,
        title: "Book 1",
        author: "Author 1",
        description: "This is a great book loved by readers.",
        image: "https://via.placeholder.com/150",
        rating: 4.8,
      },
      {
        id: 2,
        title: "Book 2",
        author: "Author 2",
        description: "Highly rated book with engaging content.",
        image: "https://via.placeholder.com/150",
        rating: 4.7,
      },
      {
        id: 3,
        title: "Book 3",
        author: "Author 3",
        description: "A masterpiece that captures the audience.",
        image: "https://via.placeholder.com/150",
        rating: 4.5,
      },
      {
        id: 4,
        title: "Book 4",
        author: "Author 4",
        description: "An excellent book for enthusiasts.",
        image: "https://via.placeholder.com/150",
        rating: 4.3,
      },
    ];

    // Lặp danh sách để đạt 20 cuốn sách
    const repeatedBooks = Array.from({ length: 5 }, () => mockBooks).flat();
    setTopBooks(repeatedBooks);
  }, []);

  const books = [
    { id: 1, title: "Journey to the Unknown", author: "John Doe", genre: "Adventure", image: "/images/book1.jpg", summary: "An epic journey filled with mysteries and challenges." },
    { id: 2, title: "Love in the Air", author: "Jane Austen", genre: "Romance", image: "/images/book2.jpg", summary: "A heartwarming tale of love and relationships." },
    { id: 3, title: "The Future Chronicles", author: "Isaac Asimov", genre: "Sci-fi", image: "/images/book3.jpg", summary: "Exploring the depths of science and technology." },
    { id: 4, title: "The Hidden Magic", author: "J.K. Rowling", genre: "Fantasy", image: "/images/book3.jpg", summary: "A magical journey through enchanted lands." },
    { id: 5, title: "The Art of Mindfulness", author: "Thich Nhat Hanh", genre: "Non-fiction", image: "/images/book3.jpg", summary: "A guide to living in the present moment." },
  ];

  const handleSearch = () => {
    const filtered = books.filter((book) =>
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

      {/* Thanh nhập mô tả */}
      <div className="search-bar">
        <textarea
          placeholder="Enter your preferences..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          rows="4"
        />
        <button onClick={handleSearch}>Find Books</button>
      </div>

      {/* Danh sách kết quả tìm kiếm */}
      <div className="book-list">
        {filteredBooks.length > 0 ? (
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

        {/* Hiển thị danh sách Top Favorites */}
        <div className="book-carousel-wrapper">
          <div className="book-carousel">
            {topBooks.map((book, index) => (
              <div
                key={index}
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
