import React from 'react';
import { useParams } from 'react-router-dom';
import './ReadBook.css';

const bookContentData = {
  1: "This is the plot of The Great Gatsby...",
  
};

function ReadBook() {
  const { bookId } = useParams();
  const content = bookContentData[bookId];
  if (!content) return <p>Không tìm thấy nội dung cho sách này.</p>;

  return (
    <div className="read-book-container">
      <h1>Book content</h1>
      <div className="book-content">
        <p>{content}</p>
      </div>
    </div>
  );
}

export default ReadBook;
