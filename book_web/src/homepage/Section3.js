import React from 'react';
import './Section3.css';
import { useNavigate } from 'react-router-dom';

const Section3 = () => {
  const navigate = useNavigate();

  const handleCreateBook = () => {
    navigate('/create-book'); // Đường dẫn này phải trùng với route trong App.js
  };

  return (
    <div className="section3-container" style={{ backgroundColor: '#9cb898' }}>
      <div className="section3-body">
        <h1>CREATE YOUR OWN BOOK</h1>
        <p>Start a new journey by creating a book that reflects your ideas and stories.</p>
        <button onClick={handleCreateBook}>Create Book</button>
      </div>

      <div className="image-gallery">
        <img src={`${process.env.PUBLIC_URL}/img/section3_1.jpg`} alt="section3_" />
        <img src={`${process.env.PUBLIC_URL}/img/section3_2.jpg`} alt="section3_" />
        <img src={`${process.env.PUBLIC_URL}/img/section3_3.jpg`} alt="section3_" />
        <img src={`${process.env.PUBLIC_URL}/img/section3_4.jpg`} alt="section3_" />
        <img src={`${process.env.PUBLIC_URL}/img/section3_5.jpg`} alt="section3_" />
      </div>

      <footer className="section3-footer">
        <p>More books to discover...</p>
      </footer>
    </div>
  );
};

export default Section3;
