import React from 'react';
import './BookCard.css';

function BookCard({ book }) {
    return (
        <div className="book-card">
            <h3>{book.title}</h3>
            <p>{book.description}</p>
        </div>
    );
}

export default BookCard;
