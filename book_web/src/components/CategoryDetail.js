import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CategoryDetail.css';

const libraryData = [
  {
    category: "fiction",
    books: [
      { id: 1, title: "The Great Gatsby", description: "Classic American novel", image: "/img/biasach_1.jpg" },
      { id: 2, title: "To Kill a Mockingbird", description: "Novel on racial injustice", image: "/img/biasach_2.jpg" },
    ],
  },
  // Thêm các danh mục sách khác...
];

function CategoryDetail() {
  const { categoryId } = useParams(); // Đọc categoryId từ URL
  const navigate = useNavigate();

  if (!categoryId) {
    return <p>Không tìm thấy danh mục</p>;
  }

  const categoryData = libraryData.find(
    (category) => category.category.toLowerCase() === categoryId.toLowerCase()
  );

  if (!categoryData) {
    return <p>Không tìm thấy danh mục</p>;
  }

  return (
    <div className="category-detail-container">
      <h1>{categoryData.category}</h1>
      <div className="book-list">
        {categoryData.books.map((book) => (
          <div key={book.id} className="book-card" onClick={() => navigate(`/book/${book.id}`)}>
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
