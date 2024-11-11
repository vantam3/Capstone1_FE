import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetail.css';
import { FaStar } from 'react-icons/fa';

const libraryData = [
    {
        category: "Fiction",
        books: [
            {
                id: 1,
                title: "The Great Gatsby",
                description: "Classic American novel",
                summary: "A story about Jay Gatsby, a man who is in love with Daisy Buchanan and hosts extravagant parties to attract her attention.",
                author: "F. Scott Fitzgerald",
                image: "/img/biasach_1.jpg",
                details: "A novel set in the Jazz Age that tells the story of Jay Gatsby's unrequited love.",
            },
            {
                id: 2,
                title: "To Kill a Mockingbird",
                description: "Novel on racial injustice",
                summary: "The journey of young Scout Finch as she learns about racial inequality in the American South.",
                author: "Harper Lee",
                image: "/img/biasach_2.jpg",
                details: "A novel about the serious issues of rape and racial inequality, seen through the eyes of young Scout Finch.",
            },
            {
                id: 3,
                title: "1984",
                description: "Dystopian future",
                summary: "The life of Winston Smith under a totalitarian regime where Big Brother is always watching.",
                author: "George Orwell",
                image: "/img/biasach_3.jpg",
                details: "A story about a dystopian future under a totalitarian regime led by Big Brother.",
            },
        ],
    },
];

function BookDetail() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const book = libraryData.flatMap(category => category.books).find(b => b.id === parseInt(bookId));

    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: '', comment: '' });

    if (!book) {
        return <p>Book not found.</p>;
    }

    const handleAddReview = (e) => {
        e.preventDefault();
        if (newReview.rating && newReview.comment) {
            setReviews([...reviews, { ...newReview, date: new Date().toLocaleDateString() }]);
            setNewReview({ rating: '', comment: '' });
        }
    };

    return (
        <div className="book-detail-container">
            <h1>{book.title}</h1>
            <img src={book.image} alt={book.title} className="book-detail-image" />
            <div className="book-detail-info">
                <h2>Author: {book.author}</h2>
                <p><strong>Summary:</strong> {book.summary}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <p>{book.details}</p>

                <button 
                    className="read-book-button" 
                    onClick={() => navigate(`/read-book/${book.id}`)}
                >
                    Read Book
                </button>
            </div>

            <div className="reviews-section">
                <h2>Reviews & Comments</h2>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <p><strong>Rating:</strong> {[...Array(parseInt(review.rating))].map((_, i) => (
                                <FaStar key={i} color="#ffc107" />
                            ))}</p>
                            <p>{review.comment}</p>
                            <p><em>{review.date}</em></p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to review this book!</p>
                )}

                <form onSubmit={handleAddReview} className="review-form">
                    <label>
                        Rating Start:
                        <select 
                            value={newReview.rating} 
                            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                        >
                            <option value="">Select rating</option>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <option key={star} value={star}>
                                    {star} <FaStar color="#ffc107" />
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Comment:
                        <textarea 
                            value={newReview.comment} 
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            placeholder="Write your comment here..."
                        />
                    </label>
                    <button type="submit" className="add-review-button">Add Review</button>
                </form>
            </div>
        </div>
    );
}

export default BookDetail;
