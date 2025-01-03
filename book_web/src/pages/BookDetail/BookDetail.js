import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './BookDetail.css';

function BookDetail() {
    const { bookId } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: '', comment: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');

    // Fetch book details
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/books/${bookId}/`);
                setBook(response.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
                setError("Failed to load book details.");
            } finally {
                setLoading(false);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/books/${bookId}/reviews/`);
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setError("Failed to load reviews.");
            }
        };

        fetchBookDetails();
        fetchReviews();
    }, [bookId]);

    // Gửi lịch sử đọc sách đến backend
    const handleReadNow = async () => {
        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'Please log in to read this book',
                confirmButtonText: 'OK',
            });
            navigate('/login');
            return;
        }

        try {
            // Gửi yêu cầu thêm vào lịch sử đọc
            await axios.post(
                'http://localhost:8000/api/reading-history/add/',
                { book_id: bookId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            Swal.fire({
                icon: 'success',
                title: 'Reading History Updated!',
                text: 'Happy reading!',
                timer: 1500,
                showConfirmButton: false,
            });

            // Chuyển hướng người dùng đến trang đọc sách
            navigate(`/read/${bookId}`);
        } catch (error) {
            console.error("Error adding to reading history:", error);
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: 'Failed to update reading history.',
            });
        }
    };

    // Thêm review mới
const handleAddReview = async (e) => {
    e.preventDefault();

    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!token) {
        Swal.fire({
            icon: 'warning',
            title: 'You need to log in to add a review!',
            text: 'Please log in to share your thoughts on this book.',
            confirmButtonText: 'Log In',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/login'); // Điều hướng đến trang đăng nhập
            }
        });
        return; // Dừng xử lý tiếp
    }

    if (!newReview.rating || !newReview.comment) {
        Swal.fire({
            icon: 'warning',
            title: 'Incomplete Review',
            text: 'Please provide both a rating and a comment before submitting.',
            confirmButtonText: 'OK',
        });
        return; // Dừng xử lý nếu thông tin không đầy đủ
    }
    

    try {
        const response = await axios.post(
            `http://localhost:8000/api/books/${bookId}/add_review/`,
            newReview,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        setReviews((prevReviews) => [...prevReviews, response.data]);
        setNewReview({ rating: '', comment: '' });
        Swal.fire({
            icon: 'success',
            title: 'Thank you for your review!',
            text: 'Your review has been added successfully.',
            timer: 1500,
            showConfirmButton: false,
        });
    } catch (error) {
        console.error("Error adding review:", error.response?.data || error.message);
        Swal.fire({
            icon: 'error',
            title: 'Failed to add review',
            text: 'Please try again later.',
        });
    }
};

    const renderStars = (rating) => {
        return [1, 2, 3, 4, 5].map((star) => (
            <span
                key={star}
                className={`star ${star <= rating ? 'filled' : ''}`}
            >
                ★
            </span>
        ));
    };

    if (loading) return <p>Loading book details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="book-detail-container">
            <div className="book-detail-card">
                <img src={book.image} alt={book.title} className="book-detail-image" />
                <div className="book-detail-info">
                    <h1>{book.title}</h1>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Genres:</strong> {book.genres.join(', ')}</p>
                    {/* <p><strong>Views:</strong> {book.views}</p> */}
                    <p><strong>Rating:</strong>
                        <span className="rating-stars">
                            {renderStars(book.average_rating)}
                        </span>
                        ({book.average_rating}/5)
                    </p>
                    {/* <p className="book-description"><strong>Description:</strong> {book.description}</p> */}

                    <button className="read-now-button" onClick={handleReadNow}>
                        Read Now
                    </button>
                </div>
            </div>

            <div className="reviews-section">
                <h2>Reviews & Comments</h2>
                <form onSubmit={handleAddReview} className="review-form">
                    <div className="rating-stars-input">
                        <h4>Your Rating:</h4>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${star <= newReview.rating ? 'filled' : ''}`}
                                onClick={() => setNewReview({ ...newReview, rating: star })}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <textarea
                        placeholder="Write your review..."
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        className="review-textarea"
                    />
                    <button type="submit" className="submit-button">Submit Review</button>
                </form>

                <div className="reviews-list">
                    <h3>User Reviews</h3>
                    {reviews.length === 0 ? (
                        <p>No reviews yet. Be the first to review!</p>
                    ) : (
                        reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <div className="review-header">
                                    <strong>{review.user}</strong> {/* Hiển thị tên người dùng */}
                                    <span className="review-date">
                                        {isNaN(new Date(review.createdAt).getTime()) 
                                            ? 'Unknown Date' 
                                            : `${new Date(review.createdAt).toLocaleDateString()} - ${new Date(review.createdAt).toLocaleTimeString()}`}
                                    </span>
                             </div>
                            <div className="review-rating">{renderStars(review.rating)}</div>
                    <p className="review-comment">{review.comment}</p>
            </div>
        ))
    )}
</div>

            </div>
        </div>
    );
}

export default BookDetail;
