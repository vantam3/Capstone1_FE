import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FavoriteBooks.css";

function FavoriteBooks() {
  const navigate = useNavigate();

  // console.log("FavoriteBooks props:", { isOpen, onClose });

  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    // Fetch favorite books from an API or mock data
    const fetchedBooks = [
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        image: "/images/book1.jpg",
      },
      {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        image: "/images/book2.jpg",
      },
      {
        id: 3,
        title: "1984",
        author: "George Orwell",
        image: "/images/book3.jpg",
      },
    ];
    setFavoriteBooks(fetchedBooks);
  }, []);

  // if (!isOpen) return null;

  return (
    <div className="modal-overlay-fv">
      <div className="favorite-books-modal">
      <button className="close-fv" onClick={() => navigate('/')}>X</button>
        <h1>FAVORITE BOOKS</h1>
        <div className="favorite-books-list">
          {favoriteBooks.length > 0 ? (
            favoriteBooks.map((book) => (
              <div key={book.id} className="favorite-book-item">
                <img
                  src={book.image}
                  alt={book.title}
                  className="favorite-book-image"
                />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            ))
          ) : (
            <p>No favorite books found. Add some books to your favorites!</p>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default FavoriteBooks;
