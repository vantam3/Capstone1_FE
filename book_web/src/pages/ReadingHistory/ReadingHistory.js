import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./ReadingHistory.css";

function ReadingHistory() {
  const [showModal, setShowModal] = useState(true);
  const [history, setHistory] = useState([]); // State lưu trữ lịch sử đọc sách
  const [loading, setLoading] = useState(true); // State cho loading
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Lấy token từ localStorage

  // Đóng modal
  const handleClose = () => {
    setShowModal(false);
    navigate(-1); // Quay lại trang trước đó
  };

  // Fetch dữ liệu lịch sử đọc sách từ API
  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Please log in to view your reading history.",
        confirmButtonText: "OK",
      });
      navigate("/login");
      return;
    }

    const fetchReadingHistory = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/reading-history/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(response.data); // Lưu dữ liệu lịch sử đọc vào state
      } catch (error) {
        console.error("Error fetching reading history:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to fetch reading history!",
          text: "Please try again later.",
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    };

    fetchReadingHistory();
  }, [token, navigate]);

  return (
    <>
      {showModal && (
        <div className="overlay">
          <div className="modal">
            <h2>Reading History</h2>

            {loading ? (
              <p>Loading your reading history...</p>
            ) : history.length === 0 ? (
              <p>You have no reading history yet.</p>
            ) : (
              <ul className="reading-history-list">
                {history.map((book) => (
                  <li key={book.id} className="reading-history-item">
                    <img
                      src={book.book_image}
                      alt={book.book_title}
                      className="history-book-image"
                    />
                    <div className="history-book-details">
                      <h3>{book.book_title}</h3>
                      <p><strong>Author:</strong> {book.book_author}</p>
                      <p><strong>Read on:</strong> {book.read_at}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={handleClose} className="cancel-button">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ReadingHistory;
