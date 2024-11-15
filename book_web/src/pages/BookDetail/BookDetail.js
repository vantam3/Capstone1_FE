import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookDetail.css';

function BookDetail() {
    const { bookId } = useParams(); // Lấy bookId từ URL
    const navigate = useNavigate(); // Khởi tạo navigate với useNavigate()

    // State để lưu chi tiết sách và đánh giá
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: '', comment: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Gọi API để lấy thông tin chi tiết sách
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/books/${bookId}/`);
                setBook(response.data); // Lưu chi tiết sách vào state
                setReviews(response.data.reviews || []); // Lưu đánh giá vào state
            } catch (error) {
                console.error("Error fetching book details:", error);
                setError("Failed to load book details.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchBookDetails();
    }, [bookId]);

    // Hàm xử lý khi người dùng thêm đánh giá mới
    const handleAddReview = async (e) => {
        e.preventDefault();
        if (newReview.rating && newReview.comment) {
            try {
                const response = await axios.post(`http://localhost:8000/api/books/${bookId}/add_review/`, newReview, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setReviews([...reviews, response.data]); // Cập nhật danh sách đánh giá
                setNewReview({ rating: '', comment: '' }); // Xóa form
            } catch (error) {
                console.error("Error adding review:", error);
                setError("Failed to add review. Please try again.");
            }
        } else {
            setError("Please fill in both rating and comment.");
        }
    };

    // Hiển thị loading khi dữ liệu đang được tải
    if (loading) {
        return <p>Loading book details...</p>;
    }

    // Xử lý khi sách không tìm thấy hoặc có lỗi
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="book-detail-container">
            <h1>{book.title}</h1>
            
            {/* Hiển thị ảnh nếu có */}
            {book.image ? (
                <img src={book.image} alt={book.title} className="book-detail-image" />
            ) : (
                <div className="no-image">No Image Available</div>
            )}

            <div className="book-detail-info">
                <h2>Author: {book.author}</h2>
                <p><strong>Download Link:</strong> <a href={book.download_link} target="_blank" rel="noopener noreferrer">Download Book</a></p>
                <p><strong>Created At:</strong> {new Date(book.create_at).toLocaleDateString()}</p>

                {/* Nút Read Book */}
                <button 
                    className="read-book-button" 
                    onClick={() => navigate(`/read/${book.id}`)}
                >
                    Read Book
                </button>
            </div>

            {/* Khu vực đánh giá và bình luận */}
            <div className="reviews-section">
                <h2>Reviews & Comments</h2>

                {/* Hiển thị các đánh giá hiện có */}
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <p><strong>Rating:</strong> {review.rating}/5</p>
                            <p>{review.comment}</p>
                            <p><em>{review.created_at || new Date().toLocaleDateString()}</em></p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to review this book!</p>
                )}

                {/* Form để thêm đánh giá mới */}
                <form onSubmit={handleAddReview} className="review-form">
                    <label>
                        Rating:
                        <select 
                            value={newReview.rating} 
                            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                        >
                            <option value="">Select rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </label>
                    <label>
                        Comment:
                        <textarea 
                            value={newReview.comment} 
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        />
                    </label>
                    <button type="submit">Add Review</button>
                </form>
            </div>
        </div>
    );
}

export default BookDetail;
