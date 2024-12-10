import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetail.css';

const libraryData = [
    {
        category: "Fiction",
        books: [
            {
                id: 1,
                title: "The Great Gatsby",
                description: "Classic American novel",
                author: "F. Scott Fitzgerald",
                image: "/images/book1.jpg",
                details: "A novel set in the Jazz Age that tells the story of Jay Gatsby's unrequited love.",
            },
            {
                id: 2,
                title: "To Kill a Mockingbird",
                description: "Novel on racial injustice",
                author: "Harper Lee",
                image: "/images/book2.jpg",
                details: "A novel about the serious issues of rape and racial inequality, seen through the eyes of young Scout Finch.",
            },
            {
                id: 3,
                title: "1984",
                description: "Dystopian future",
                author: "George Orwell",
                image: "/images/book3.jpg",
                details: "A story about a dystopian future under a totalitarian regime led by Big Brother.",
            },
        ],
    },
];

function BookDetail() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: '', comment: '' });

    // Find the book by its ID
    const book = libraryData
        .flatMap(category => category.books)
        .find(b => b.id === parseInt(bookId));

    // If the book is not found, display a message
    if (!book) {
        return <p>Book not found</p>;
    }

    const handleAddReview = (e) => {
        e.preventDefault();
        if (newReview.rating && newReview.comment) {
            setReviews([
                ...reviews,
                { ...newReview, date: new Date().toLocaleDateString() }
            ]);
            setNewReview({ rating: '', comment: '' });
        }
    };

    return (
        <div className="book-detail-container">
            <h1>{book.title}</h1>
            <img src={book.image} alt={book.title} className="book-detail-image" />
            <div className="book-detail-info">
                <h2>Author: {book.author}</h2>
                <p>{book.details}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <button
                    className="read-book-button"
                    onClick={() => navigate(`/read/${book.id}`)}
                >
                    Read Book
                </button>
            </div>

            <div className="reviews-section">
                <h2>Reviews & Comments</h2>

                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <p><strong>Rating:</strong> {review.rating}/5</p>
                            <p>{review.comment}</p>
                            <p><em>{review.date}</em></p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to review this book!</p>
                )}

                <form onSubmit={handleAddReview} className="review-form">
                    <label>
                        Rating:
                        <select
                            value={newReview.rating}
                            onChange={(e) =>
                                setNewReview({ ...newReview, rating: e.target.value })
                            }
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
                            onChange={(e) =>
                                setNewReview({ ...newReview, comment: e.target.value })
                            }
                        />
                    </label>
                    <button type="submit">Add Review</button>
                </form>
            </div>
        </div>
    );
}

export default BookDetail;
