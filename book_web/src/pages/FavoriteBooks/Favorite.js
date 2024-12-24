import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Favorite.css";

function Favorite() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(true); // Hiển thị modal
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Lấy token từ localStorage

  // Fetch danh sách sách yêu thích từ API
  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Please log in to view your favorites",
        showConfirmButton: true,
      });
      navigate("/login");
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/favorites/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoriteBooks(response.data); // Lưu dữ liệu từ API
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token, navigate]);

  // Đóng modal
  const handleClose = () => {
    setShowModal(false);
    navigate(-1); // Quay lại trang trước
  };

  return (
    <>
      {showModal && (
        <div className="overlay">
          <div className="modal">
            <button className="back-button" onClick={handleClose}>
              <span className="chevron-left">←</span> Back
            </button>
            <h2>Your Favorite Books</h2>
            {loading ? (
              <p>Loading...</p>
            ) : favoriteBooks.length === 0 ? (
              <p>You have no favorite books yet.</p>
            ) : (
              <div className="favorite-books-list">
                {favoriteBooks.map((book) => (
                  <div key={book.id} className="favorite-book-card">
                    <div className="book-image">
                      <img src={book.image} alt={book.title} />
                    </div>
                    <div className="book-info">
                      <h3>{book.title}</h3>
                      <p><strong>Author:</strong> {book.author || "Unknown Author"}</p>
                    </div>
                  </div>
                ))}
              </div>
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

export default Favorite;
