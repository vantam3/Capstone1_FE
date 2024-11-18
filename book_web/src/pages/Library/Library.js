import React, { useEffect, useState } from 'react';
import './Library.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Library() {
    const [libraryData, setLibraryData] = useState([]); // State để lưu trữ dữ liệu sách
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    useEffect(() => {
        // Gọi API để lấy dữ liệu sách
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/books/');
                const books = response.data;
                
                // Phân loại sách theo thể loại (giả sử mỗi sách có trường `category`)
                const categorizedBooks = books.reduce((acc, book) => {
                    const category = book.category || "Uncategorized";
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(book);
                    return acc;
                }, {});

                // Định dạng lại dữ liệu cho phù hợp với `libraryData`
                const formattedData = Object.entries(categorizedBooks).map(([category, books]) => ({
                    category,
                    books,
                }));
                
                setLibraryData(formattedData); // Lưu dữ liệu vào state
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy dữ liệu sách:", error);
            }
        };

        fetchBooks(); // Gọi hàm fetchBooks khi component được render
    }, []);

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
                                    <p></p>
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
