import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReadingHistory.css';

function ReadingHistory() {
  const navigate = useNavigate();
  const [books] = useState([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      cover: '/images/book1.jpg',
      status: 'completed',
      lastReadDate: '2024-12-10',
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      cover: 'images/book2.jpg',
      status: 'completed',
      lastReadDate: '2024-12-09',
    },
  ]);

  // const handleClose = () => {
  //   navigate('/');
  //   if (onClose) onClose();
  // };

  return (
    <div className="reading-history-modal">
      <div className="reading-history-content">
      <button className="close-his" onClick={() => navigate('/')}>X</button>
        <h1>READING HISTORY</h1>
        <div className="books-container">
          {books.map((book) => (
            <div key={book.id} className="book-item">
              <img src={book.cover} alt={book.title} className="book-cover" />
              <div className="book-details">
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Last Read: {book.lastReadDate}</p>
                
              </div>
              {book.status === 'completed' && (
                <div className="book-completed-icon">✔</div>
              )}
              
            </div>

          ))}
          
        </div>
        
      </div>
    </div>
  );
}

export default ReadingHistory;
