import React from 'react';
import './BooksLibrary.css';
import { useNavigate } from 'react-router-dom';

const libraryData = [
    {
        category: "Fiction",
        books: [
            { id: 1, title: "The Great Gatsby", description: "Classic American novel", image: "/img/biasach_1.jpg" },
            { id: 2, title: "To Kill a Mockingbird", description: "Novel on racial injustice", image: "/img/biasach_2.jpg" },
            { id: 3, title: "1984", description: "Dystopian future", image: "/img/biasach_3.jpg" },
        ],
    },
    {
        category: "Science",
        books: [
            { id: 4, title: "A Brief History of Time", description: "Understanding the universe", image: "/img/biasach_4.jpg" },
            { id: 5, title: "Cosmos", description: "Exploration of the universe", image: "/img/biasach_5.jpg" },
            { id: 6, title: "The Selfish Gene", description: "Genetics and evolution", image: "/img/biasach_1.jpg" },
        ],
    },
    {
        category: "History",
        books: [
            { id: 7, title: "The Diary of Anne Frank", description: "Story of a Jewish girl", image: "/img/biasach_2.jpg" },
            { id: 8, title: "Sapiens", description: "Brief history of humankind", image: "/img/biasach_3.jpg" },
            { id: 9, title: "Guns, Germs, and Steel", description: "Factors influencing human societies", image: "/img/biasach_4.jpg" },
        ],
    },
    {
        category: "Philosophy",
        books: [
            { id: 10, title: "Meditations", description: "Thoughts of Marcus Aurelius", image: "/img/biasach_5.jpg" },
            { id: 11, title: "The Republic", description: "Philosophical ideas on justice", image: "/img/biasach_1.jpg" },
            { id: 12, title: "Beyond Good and Evil", description: "Nietzsche's perspectives", image: "/img/biasach_2.jpg" },
        ],
    },
];

function Library() {
    const navigate = useNavigate(); 
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
                                 onClick={() => navigate(`/book/${book.id}`)} 
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
