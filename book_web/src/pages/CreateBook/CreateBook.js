import React from 'react';
import './CreateBook.css';

const CreateBook = () => {
  return (
    <div className="create-book-container">
      <h1 className="create-book-title">Create Your Book</h1>
      <p className="create-book-description">Fill in the details below to create your book.</p>
      
      <form className="create-book-form">
        <label>Book Title</label>
        <input type="text" placeholder="Enter book title" />

        <label>Author</label>
        <input type="text" placeholder="Enter author name" />

        <label>Genre</label>
        <select>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-fiction</option>
          <option value="fantasy">Fantasy</option>
          <option value="science">Science</option>
          <option value="history">History</option>
        </select>

        <label>Description</label>
        <textarea placeholder="Write a brief description..." rows="4"></textarea>

        <button type="submit" className="create-book-submit">Create Book</button>
      </form>
    </div>
  );
};

export default CreateBook;
