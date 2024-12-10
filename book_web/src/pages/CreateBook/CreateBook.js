import React, { useState } from 'react';
import './CreateBook.css';

const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    text: ''
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/create-book/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setFormData({
          title: '',
          author: '',
          genre: '',
          description: '',
          text: ''
        });
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('Failed to create book. Please try again later.');
    }
  };

  return (
    <div className="create-book-container">
      <h1 className="create-book-title">Create Your Book</h1>
      <p className="create-book-description">Fill in the details below to create your book.</p>

      {message && <p className="create-book-message">{message}</p>}

      <form className="create-book-form" onSubmit={handleSubmit}>
        <label>Book Title</label>
        <input 
          type="text" 
          name="title" 
          placeholder="Enter book title" 
          value={formData.title} 
          onChange={handleChange} 
        />

        <label>Author</label>
        <input 
          type="text" 
          name="author" 
          placeholder="Enter author name" 
          value={formData.author} 
          onChange={handleChange} 
        />

        <label>Genre</label>
        <input 
          type="text" 
          name="genre" 
          placeholder="Enter or select genre" 
          value={formData.genre} 
          onChange={handleChange} 
          list="genres"
        />
        <datalist id="genres">
          <option value="Fiction" />
          <option value="Non-fiction" />
          <option value="Fantasy" />
          <option value="Science" />
          <option value="History" />
        </datalist>

        <label>Description</label>
        <textarea 
          name="description" 
          placeholder="Write a brief description..." 
          rows="4" 
          value={formData.description} 
          onChange={handleChange} 
        ></textarea>

        <label>Text</label>
        <textarea 
          name="text" 
          placeholder="Write the full text of the book..." 
          rows="8" 
          value={formData.text} 
          onChange={handleChange} 
        ></textarea>

        <button type="submit" className="create-book-submit">Create Book</button>
      </form>
    </div>
  );
};

export default CreateBook;
