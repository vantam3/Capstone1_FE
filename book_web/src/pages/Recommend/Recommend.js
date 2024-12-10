import React, { useState } from 'react';
import './Recommend.css';

function NewRecommend() {
    const [filters, setFilters] = useState({
        ageGroup: '',
        genre: '',
        language: '',
    });

    const [search, setSearch] = useState('');
    const books = [
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', image: '/images/gatsby.jpg', trending: true },
        { title: '1984', author: 'George Orwell', image: '/images/1984.jpg', trending: false },
        { title: 'To Kill a Mockingbird', author: 'Harper Lee', image: '/images/mockingbird.jpg', trending: true },
        { title: 'Harry Potter', author: 'J.K. Rowling', image: '/images/harrypotter.jpg', trending: false },
        // Add more books here
    ];

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredBooks = books.filter((book) => {
        return (
            (!filters.ageGroup || book.ageGroup === filters.ageGroup) &&
            (!filters.genre || book.genre === filters.genre) &&
            (!filters.language || book.language === filters.language) &&
            book.title.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <div className="new-recommend-page">
            <header className="header">
                <h1>Welcome to Your Personalized Library</h1>
                <p>Find books tailored to your preferences and explore trending stories.</p>
            </header>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by title, author, or genre..."
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="filters">
                <select name="ageGroup" onChange={handleFilterChange}>
                    <option value="">Select Age Group</option>
                    <option value="12-15">12-15</option>
                    <option value="16-20">16-20</option>
                    <option value="21-30">21-30</option>
                    <option value="31-40">31-40</option>
                    <option value="41-50">41-50</option>
                    <option value="50+">50+</option>
                </select>

                <select name="genre" onChange={handleFilterChange}>
                    <option value="">Select Genre</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Romance">Romance</option>
                    <option value="Science Fiction">Science Fiction</option>
                </select>

                <select name="language" onChange={handleFilterChange}>
                    <option value="">Select Language</option>
                    <option value="English">English</option>z
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                </select>
            </div>

            <div className="book-suggestions">
                <h2>Recommended Books</h2>
                <div className="book-grid">
                    {filteredBooks.map((book, index) => (
                        <div key={index} className="book-card">
                            <img src={book.image} alt={book.title} />
                            <div className="book-details">
                                <h3>{book.title}</h3>
                                <p>{book.author}</p>
                                {book.trending && <span className="trending">Trending</span>}
                                <button>Add to Favorites</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewRecommend;
