import React from 'react';
import './Section2.css';

const Section2 = () => {
  return (
    <div className="section-container" style={{ backgroundColor: '#aabcc3' }}>
      <div className="content-container">
        <div className="text-content">
          <h1>FINDING A HOBBY FOR READING</h1>
          <p>
            Based on your choice, we will recommend suitable books. Explore our collection and find something that fits your taste.
          </p>
          <button className="explore-button">Explore Now</button>
        </div>
        
        <div className="image-gallery">
          <img src={`${process.env.PUBLIC_URL}/img/section2_1.jpg`} alt="section2_1" className="gallery-img" />
          <img src={`${process.env.PUBLIC_URL}/img/section2_2.jpg`} alt="section2_2" className="gallery-img" />
          <img src={`${process.env.PUBLIC_URL}/img/section2_3.jpg`} alt="section2_3" className="gallery-img" />
        </div>
      </div>
    </div>
  );
};

export default Section2;
