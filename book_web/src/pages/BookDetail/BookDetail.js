import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookDetail.css';

const mockBooks = [
    {
        id: 1,
        title: 'Book 1',
        author: 'Author 1',
        image: 'https://via.placeholder.com/200x300',
        description: 'This is a description of Book 1.',
        rating: 4.5,
        genres: ['Fiction', 'Adventure'],
        views: 1200,
        reviews: [
            { rating: 5, comment: 'Amazing book!', createdAt: '2023-12-01' },
            { rating: 4, comment: 'Quite engaging.', createdAt: '2023-12-02' },
        ],
    },
    {
        id: 2,
        title: 'Book 2',
        author: 'Author 2',
        image: 'https://via.placeholder.com/200x300',
        description: 'This is a description of Book 2.',
        rating: 4.0,
        genres: ['Non-fiction'],
        views: 800,
        reviews: [
            { rating: 3, comment: 'Not my style.', createdAt: '2023-11-30' },
        ],
    },
];

function BookDetail() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const selectedBook = mockBooks.find((b) => b.id === parseInt(bookId));
        if (selectedBook) {
            setBook(selectedBook);
            setReviews(selectedBook.reviews || []);
        }
    }, [bookId]);

    const handleRating = (value) => {
        setRating(value);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (newReview && rating > 0) {
            const newReviewData = {
                rating,
                comment: newReview,
                createdAt: new Date().toLocaleDateString(),
            };
            setReviews([...reviews, newReviewData]);
            setNewReview('');
            setRating(0);
        }
    };

    if (!book) {
        return <p>Loading book details...</p>;
    }

    return (
        <div className="book-detail-container">
            <div className="book-detail-card">
                <img src={book.image} alt={book.title} className="book-detail-image" />
                <div className="book-detail-info">
                    <h1>{book.title}</h1>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Genres:</strong> {book.genres.join(', ')}</p>
                    <p><strong>Views:</strong> {book.views}</p>
                    <p>
                        <strong>Rating:</strong>{' '}
                        <span className="rating-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= book.rating ? 'filled' : ''}`}
                                >
                                    ★
                                </span>
                            ))}
                        </span>
                        ({book.rating}/5)
                    </p>
                    <p className="book-description"><strong>Description:</strong> {book.description}</p>
                    <button className="read-now-button">Read Now</button>
                </div>
            </div>

            <div className="reviews-section">
                <h2>Reviews & Comments</h2>
                <form onSubmit={handleReviewSubmit} className="review-form">
                    <div className="rating-stars-input">
                        <h4>Your Rating:</h4>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${star <= rating ? 'filled' : ''}`}
                                onClick={() => handleRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <textarea
                        placeholder="Write your review..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        className="review-textarea"
                    />
                    <button type="submit" className="submit-button">
                        Submit Review
                    </button>
                </form>

                <div className="reviews-list">
                    <h3>User Reviews</h3>
                    {reviews.length === 0 ? (
                        <p>No reviews yet. Be the first to review!</p>
                    ) : (
                        reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <div className="review-rating">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`star ${star <= review.rating ? 'filled' : ''}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <p className="review-comment">{review.comment}</p>
                                <p className="review-date">{review.createdAt}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookDetail;
