import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaLightbulb } from 'react-icons/fa';
import './Section1.css';

const Section1 = () => {
  return (
    <div className="section-container" style={{ backgroundColor: '#ffebcd' }}>
      <div className="body">
        <h1><FaLightbulb /> WHAT IS YOUR READING INTEREST??? <FaBookOpen /></h1>
        <p>Children’s books, psychology, romance, religion, science, story books....</p>
        <div className="book-covers">
          <img src={`${process.env.PUBLIC_URL}/img/biasach_1.jpg`} alt="MILLY'S ERRAND" />
          <img src={`${process.env.PUBLIC_URL}/img/biasach_2.jpg`} alt="A KNIGHT OF THE AIR" />
          <img src={`${process.env.PUBLIC_URL}/img/biasach_3.jpg`} alt="THE POPULAR MAGAZINE" />
          <img src={`${process.env.PUBLIC_URL}/img/biasach_4.jpg`} alt="FAVOTITE FAIRY TALES" />
          <img src={`${process.env.PUBLIC_URL}/img/biasach_5.jpg`} alt="ACLICE IN WONDERLAND" />
        </div>
      </div>

      <footer className="footer">
        <Link to="/books-library" className="explore-button">Explore Now</Link>
      </footer>
    </div>
  );
};

export default Section1;
