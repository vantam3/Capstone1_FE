import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "bad-words"; // Use the bad-words library
import "./Recommend.css"; // Import updated CSS file

const RecommendationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [topBooks, setTopBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Create filter from bad-words
  const filter = new Filter();

  // Regex to allow only English
  const isValidEnglishInput = (input) => {
    const englishRegex = /^[a-zA-Z0-9\s.,!?'-]*$/;
    return englishRegex.test(input);
  };

  // Function to validate input
  const validateInput = (text) => {
    if (text.trim() === "") return "Please enter your preferences.";
    if (filter.isProfane(text)) return "Input contains inappropriate words."; // Check with bad-words
    if (!isValidEnglishInput(text)) return "Input must be in English.";
    return null; // Valid
  };

  // Fetch top books on page load
  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await fetch("/api/top-books");
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
      setErrorMessage("Please enter your preferences.");
      return;
    }

    const validationError = validateInput(searchTerm);
    if (validationError) {
      setErrorMessage(validationError);
      setFilteredBooks([]); // Clear previous results
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8000/api/recommend_books/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchTerm }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch book recommendations.");
      }

      const data = await response.json();
      setFilteredBooks(data);
      localStorage.setItem("recommendations", JSON.stringify(data));
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage(`An error occurred: ${error.message}`);
      setFilteredBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    const validationError = validateInput(input);
    if (validationError) {
      setErrorMessage(validationError);
      setFilteredBooks([]);
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div className="recommendations__container">
      <h1 className="recommendations__title">Find Books Based on Your Preferences</h1>
      <p className="recommendations__p">Describe your preferences, and we will find books you love!</p>

      {/* Input bar */}
      <div className="search__bar">
        <textarea
          placeholder="Enter your preferences..."
          value={searchTerm}
          onChange={handleInputChange}
          rows="4"
        />
        <button onClick={handleSearch} disabled={!!errorMessage || isLoading}>
          {isLoading ? "Loading..." : "Find Books"}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      {/* Recommended Book List */}
      <div className="book__list">
        {isLoading ? (
          <p>Loading book recommendations...</p>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card" onClick={() => handleBookClick(book.id)}>
              <img src={book.image} alt={book.title} className="book-card__image" />
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
          <p>Please describe your preferences...</p>
        )}
      </div>

      {/* Top Favorite Books */}
      <div className="top-favorites__container">
        <h2 className="top-favorites__title">Top Favorite Books</h2>
        <div className="book-carousel__wrapper">
          <div className="book-carousel">
            {topBooks.map((book) => (
              <div key={book.id} className="book-card">
                <img src={book.image} alt={book.title} className="book-card__image" />
                <div className="book-card__info">
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
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
