import React from 'react';
import { useParams } from 'react-router-dom';
import './ReadBook.css';

const bookContentData = {
    1: "This is the content of The Great Gatsby...",
    2: "This is the content of To Kill a Mockingbird...",
    // Thêm nội dung của các sách khác với id tương ứng
};

function ReadBook() {
    const { bookId } = useParams();
    const content = bookContentData[bookId];

    if (!content) {
        return <p>Content not found for this book.</p>;
    }

    return (
        <div className="read-book-container">
            <h1>Book Content</h1>
            <div className="book-content">
                <p>{content}</p>
            </div>
        </div>
    );
}

export default ReadBook;
