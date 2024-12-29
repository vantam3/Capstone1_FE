import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Recommend.css";

const RecommendationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [topBooks, setTopBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Regex chỉ cho phép tiếng Anh
  const isValidEnglishInput = (input) => {
    const englishRegex = /^[a-zA-Z0-9\s.,!?'\’\-]*$/;
    return englishRegex.test(input);
  };

  // Kiểm tra tần suất ký tự lặp lại (phòng tránh spam)
  const isNotSpam = (text) => {
    const spamRegex = /(.)\1{4,}/; // Tìm các ký tự lặp lại nhiều hơn 4 lần
    return !spamRegex.test(text);
  };

  // Kiểm tra tính hợp lệ của từ vựng (dựa trên từ điển cơ bản hoặc logic)
  const isValidText = (text) => {
    const words = text.split(/\s+/); // Tách thành từ
    if (words.length === 0) return false;
    const validWords = words.filter(word => /^[a-zA-Z0-9]+$/.test(word)); // Kiểm tra các từ hợp lệ
    return validWords.length / words.length >= 0.7; // Ít nhất 70% từ hợp lệ
  };

  // Hàm tổng hợp kiểm tra tính hợp lệ
  const validateInput = (text) => {
    if (text.trim() === "") return "Vui lòng nhập sở thích của bạn.";
    if (!isValidEnglishInput(text)) return "Đầu vào bắt buộc là tiếng anh.";
    if (!isNotSpam(text)) return "Đầu vào có vẻ là spam.";
    if (!isValidText(text)) return "Đầu vào không có vẻ hợp lý.";
    return null; // Hợp lệ
  };

  // Fetch top books on page load
  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await fetch("/api/top-books");
        const data = await response.json();
        setTopBooks(data);
      } catch (error) {
        console.error("Không thể lấy danh sách sách yêu thích hàng đầu:", error);
      }
    };

    fetchTopBooks();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setFilteredBooks([]);
      setErrorMessage("Vui lòng nhập sở thích của bạn.");
      return;
    }

    const validationError = validateInput(searchTerm);
    if (validationError) {
      setErrorMessage(validationError);
      setFilteredBooks([]); // Xóa kết quả trước đó
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
        throw new Error("Không thể lấy gợi ý sách.");
      }

      const data = await response.json();
      setFilteredBooks(data);
      localStorage.setItem("recommendations", JSON.stringify(data));
    } catch (error) {
      console.error("Không thể lấy sách được gợi ý:", error);
      setErrorMessage("Đã xảy ra lỗi khi lấy gợi ý sách.");
      setFilteredBooks([]); // Xóa kết quả trước đó khi có lỗi
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input); // Luôn luôn cập nhật searchTerm

    const validationError = validateInput(input);
    if (validationError) {
      setErrorMessage(validationError);
      setFilteredBooks([]); // Xóa kết quả khi đầu vào không hợp lệ
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div className="recommendations__container">
      <h1 className="recommendations__title">Tìm Sách Dựa Trên Sở Thích Của Bạn</h1>
      <p className="recommendations__p">Mô tả sở thích của bạn, chúng tôi sẽ tìm những cuốn sách bạn yêu thích!</p>

      {/* Thanh Tìm Kiếm */}
      <div className="search__bar">
        <textarea
          placeholder="Nhập sở thích của bạn..."
          value={searchTerm}
          onChange={handleInputChange}
          rows="4"
        />
        <button onClick={handleSearch} disabled={!!errorMessage || isLoading}>
          Tìm Sách
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      {/* Danh Sách Sách Gợi Ý */}
      <div className="book__list">
        {isLoading ? (
          <p>Đang tải gợi ý sách...</p>
        ) : errorMessage ? (
          // Nếu có lỗi, không hiển thị danh sách sách
          null
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
                  <strong>Tác giả:</strong> {book.author}
                </p>
                <p>
                  <strong>Độ tương đồng:</strong> {(book.similarity * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Hãy mô tả sở thích của bạn...</p>
        )}
      </div>

      {/* Sách Yêu Thích Hàng Đầu */}
      <div className="top-favorites__container">
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
                  <span className="book-card__rating">Đánh giá: {book.rating}/5</span>
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
