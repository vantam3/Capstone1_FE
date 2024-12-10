import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createbook.css';

const CreateBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "Fiction",
    description: "",
    coverImage: null
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBook((prevBook) => ({
      ...prevBook,
      coverImage: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book created:", book);
    alert("Book created successfully!")
    navigate('/bookcreated', { state: { book } });
    setBook({
      title: "",
      author: "",
      genre: "Fiction",
      description: "",
      coverImage: null
    });
  };

  return (
    <div className="create-book-container">
      <h1 >CREATE YOUR BOOK</h1>
      <p className="create-book-description">Fill in the details below to create your book.</p>
      
      <form className="create-book" onSubmit={handleSubmit}>
        <label>Book Title</label>
        <input 
          type="text" 
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Enter book title"
          required
        />

        <label>Book Creator</label>
        <input 
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Enter name of Creator"
          required
        />

        <label>Genre</label>
        <select
          name="genre"
          value={book.genre}
          onChange={handleChange}
        >
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-fiction</option>
          <option value="fantasy">Fantasy</option>
          <option value="science">Science</option>
          <option value="history">History</option>
        </select>

        <label>Description</label>
        <textarea 
          name="description"
          value={book.description}
          onChange={handleChange}
          placeholder="Write a brief description..." 
          rows="4"
        ></textarea>

        <div className="form-group">
          <label>Cover Image</label>
          <input
            type="file"
            name="coverImage"
            onChange={handleFileChange}
            accept="image/*"
            className="file-input"
          />
        </div>

        {book.coverImage && (
          <div className="form-group">
            <img 
              src={URL.createObjectURL(book.coverImage)} 
              alt="Preview" 
              className="image-preview"
            />
          </div>
        )}

        <button type="submit" className="create-book-submit">
          Create Book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
