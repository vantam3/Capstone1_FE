import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal'; // Import the modal
import './CreateBook.css';

const CreateBook = () => {
  const [book, setBook] = useState({
    title: "",
    genre: "fiction",  // Ensure the genre is sent in lowercase
    description: "",
    coverImage: null,
    text: ""  // Add field for book text
  });

  const [modal, setModal] = useState({ visible: false, title: "", message: "", type: "success" }); // Modal state
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('genre', book.genre);
    formData.append('description', book.description);
    formData.append('text', book.text);  // Trường text phải được gửi lên
    if (book.coverImage) {
      formData.append('cover_image', book.coverImage);
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/create-user-book/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Đảm bảo token hợp lệ
        },
        body: formData,
      });
  
      const result = await response.json();  
  
      if (response.ok) {
        console.log("Book created:", result);
        setModal({
          visible: true,
          title: "Success",
          message: "Book created successfully!",
          type: "success"
        });
        navigate('/bookcreated', { state: { book: result } });
      } else {
        let errorMessage = "Failed to create book.";
        if (result && result.detail) {
          errorMessage = result.detail;
        }
        setModal({
          visible: true,
          title: "Error",
          message: errorMessage,
          type: "error"
        });
      }
    } catch (error) {
      console.error("Error creating book:", error);
      setModal({
        visible: true,
        title: "Error",
        message: "An error occurred while creating the book.",
        type: "error"
      });
    }
  
    setBook({
      title: "",
      genre: "fiction", 
      description: "",
      coverImage: null,
      text: ""  // Đảm bảo reset trường này sau khi tạo sách
    });
  };

  

  const closeModal = () => {
    setModal({ visible: false, title: "", message: "", type: "success" }); // Close modal
  };

  return (
    <div className="create-book-container">
      <h1>CREATE YOUR BOOK</h1>
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

        <label>Book Text</label>
        <textarea 
          name="text"
          value={book.text}
          onChange={handleChange}
          placeholder="Enter the text of the book"
          rows="6"
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

      {modal.visible && (
        <Modal 
          title={modal.title}
          message={modal.message}
          onClose={closeModal}
          type={modal.type}
        />
      )}
    </div>
  );
};

export default CreateBook;
