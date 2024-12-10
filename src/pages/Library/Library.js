import React from 'react';
import './Library.css';
import { useNavigate } from 'react-router-dom';

// Dữ liệu mẫu cho các sách, phân loại theo thể loại
const libraryData = [
    {
        category: "Fiction",
        books: [
            {
                id: 1,
                title: "The Great Gatsby",
                description: "Classic American novel",
                image: "/images/book1.jpg",
            },
            {
                id: 2,
                title: "To Kill a Mockingbird",
                description: "Novel on racial injustice",
                image: "/images/book2.jpg",
            },
            {
                id: 3,
                title: "1984",
                description: "Dystopian future",
                image: "/images/book3.jpg",
            },
            {
                id: 3,
                title: "1984",
                description: "Dystopian future",
                image: "/images/book3.jpg",
            },
            {
                id: 3,
                title: "1984",
                description: "Dystopian future",
                image: "/images/book3.jpg",
            },
        ],
    },
    {
        category: "Science",
        books: [
            {
                id: 4,
                title: "A Brief History of Time",
                description: "Understanding the universe",
                image: "/images/book1.jpg",
            },
            {
                id: 5,
                title: "Cosmos",
                description: "Exploration of the universe",
                image: "/images/book1.jpg",
            },
            {
                id: 6,
                title: "The Selfish Gene",
                description: "Genetics and evolution",
                image: "/images/book1.jpg",
            },
            {
                id: 6,
                title: "The Selfish Gene",
                description: "Genetics and evolution",
                image: "/images/book1.jpg",
            },
        ],
    },
    {
        category: "Science",
        books: [
            {
                id: 4,
                title: "A Brief History of Time",
                description: "Understanding the universe",
                image: "/images/science1.jpg",
            },
            {
                id: 5,
                title: "Cosmos",
                description: "Exploration of the universe",
                image: "/images/science2.jpg",
            },
            {
                id: 6,
                title: "The Selfish Gene",
                description: "Genetics and evolution",
                image: "/images/science3.jpg",
            },
        ],
    },
    {
        category: "Science",
        books: [
            {
                id: 4,
                title: "A Brief History of Time",
                description: "Understanding the universe",
                image: "/images/science1.jpg",
            },
            {
                id: 5,
                title: "Cosmos",
                description: "Exploration of the universe",
                image: "/images/science2.jpg",
            },
            {
                id: 6,
                title: "The Selfish Gene",
                description: "Genetics and evolution",
                image: "/images/science3.jpg",
            },
        ],
    },
    
    // Thêm nhiều thể loại khác nếu muốn
];

function Library() {
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
    return (
        <div className="library-container">
            <h1>Explore Book Categories</h1>
            {libraryData.map((categoryData) => (
                <div key={categoryData.category} className="category-section">
                    <h2>{categoryData.category}</h2>
                    <div className="book-list">
                        {categoryData.books.map((book) => (
                            <div key={book.id} 
                                 className="book-card"
                                 onClick={() => navigate(`/book/${book.id}`)} // Điều hướng đến trang chi tiết sách
                            >   
                                <img src={book.image} alt={book.title} className="book-image" />
                                <div className="book-info">
                                    <h3>{book.title}</h3>
                                    <p>{book.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button 
                        className="see-more-button" 
                        onClick={() => navigate(`/category/${categoryData.category.toLowerCase()}`)}
                    >
                        See More
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Library;
