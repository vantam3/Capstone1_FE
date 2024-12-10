import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CategoryDetail.css';
// Dữ liệu mẫu cho các sách, tương tự như dữ liệu trong Library.js
const libraryData = [
    {
        category: "fiction",
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
        ],
    },
    {
        category: "science",
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
    // Thêm nhiều thể loại khác nếu cần
];

function CategoryDetail() {
    const { categoryName } = useParams(); // Lấy tên thể loại từ URL
    const navigate = useNavigate(); // Khởi tạo navigate với useNavigate()

    const categoryData = libraryData.find(
        (category) => category.category.toLowerCase() === categoryName.toLowerCase()
    );

    if (!categoryData) {
        return <p>Category not found</p>;
    }

    return (
        <div className="category-detail-container">
            <h1>{categoryData.category} Books</h1>
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
        </div>
    );
}

export default CategoryDetail;
