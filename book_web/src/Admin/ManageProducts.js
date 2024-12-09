import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageProducts.css';

const ManageProducts = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingBookId, setEditingBookId] = useState(null); // ID của sách đang được chỉnh sửa
    const [editingBookData, setEditingBookData] = useState(null); // Dữ liệu của sách đang được chỉnh sửa

    // Lấy danh sách sách từ API
    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/api/books/');
                setBooks(response.data);
            } catch (err) {
                console.error('Error fetching books:', err);
                setError('Failed to load books.');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    // Xử lý lưu chỉnh sửa sách
    const handleSave = async (id) => {
        if (!editingBookData) return;
    
        setLoading(true);
        try {
            // Lọc các trường đã chỉnh sửa
            const updatedFields = {};
            Object.keys(editingBookData).forEach((key) => {
                if (editingBookData[key] !== books.find((book) => book.id === id)[key]) {
                    updatedFields[key] = editingBookData[key];
                }
            });
    
            if (Object.keys(updatedFields).length === 0) {
                alert('No changes detected.');
                setEditingBookId(null);
                setEditingBookData(null);
                return;
            }
    
            const response = await axios.put(
                `http://localhost:8000/api/books/${id}/edit/`,
                updatedFields
            );
    
            // Cập nhật danh sách sách sau khi chỉnh sửa
            setBooks((prevBooks) =>
                prevBooks.map((book) => (book.id === id ? response.data : book))
            );
            setEditingBookId(null); // Hủy chế độ chỉnh sửa
            setEditingBookData(null);
            alert('Book updated successfully.');
        } catch (err) {
            console.error('Error saving changes:', err);
            alert('Failed to save changes. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    

    // Bắt đầu chỉnh sửa
    const handleEdit = (book) => {
        setEditingBookId(book.id); // Đặt ID sách đang chỉnh sửa
        setEditingBookData({ ...book }); // Sao chép dữ liệu sách để chỉnh sửa
    };

    // Hủy chỉnh sửa
    const handleCancelEdit = () => {
        setEditingBookId(null);
        setEditingBookData(null);
    };

    // Xử lý xóa sách
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this book?');
        if (!confirmed) return;
    
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8000/api/books/${id}/delete/`);
            // Loại bỏ sách khỏi danh sách hiện tại
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            alert('Book deleted successfully.');
        } catch (err) {
            console.error('Error deleting book:', err);
            alert('Failed to delete book. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="manage-products-container">
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-message">
                        <p>Loading...</p>
                    </div>
                </div>
            )}
            <h2>Manage Books</h2>
            <p>Manage books and their details here.</p>
            {error && <p className="error-message">{error}</p>}
            <table className="products-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Subject</th>
                        <th>Language</th>
                        <th>Download Link</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>
                                {editingBookId === book.id ? (
                                    <input
                                        type="text"
                                        value={editingBookData.title}
                                        onChange={(e) =>
                                            setEditingBookData({ ...editingBookData, title: e.target.value })
                                        }
                                    />
                                ) : (
                                    book.title
                                )}
                            </td>
                            <td>
                                {editingBookId === book.id ? (
                                    <input
                                        type="text"
                                        value={editingBookData.author}
                                        onChange={(e) =>
                                            setEditingBookData({ ...editingBookData, author: e.target.value })
                                        }
                                    />
                                ) : (
                                    book.author || 'Unknown Author'
                                )}
                            </td>
                            <td>
                                {editingBookId === book.id ? (
                                    <input
                                        type="text"
                                        value={editingBookData.subject}
                                        onChange={(e) =>
                                            setEditingBookData({ ...editingBookData, subject: e.target.value })
                                        }
                                    />
                                ) : (
                                    book.subject || 'No subject available'
                                )}
                            </td>
                            <td>
                                {editingBookId === book.id ? (
                                    <input
                                        type="text"
                                        value={editingBookData.language}
                                        onChange={(e) =>
                                            setEditingBookData({ ...editingBookData, language: e.target.value })
                                        }
                                    />
                                ) : (
                                    book.language || 'Unknown'
                                )}
                            </td>
                            <td>
                                <a href={book.download_link} target="_blank" rel="noopener noreferrer">
                                    Download
                                </a>
                            </td>
                            <td>
                                {editingBookId === book.id ? (
                                    <>
                                        <button className="save-button" onClick={() => handleSave(book.id)}>
                                            Save
                                        </button>
                                        <button className="cancel-button" onClick={handleCancelEdit}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="edit-button" onClick={() => handleEdit(book)}>
                                            Edit
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDelete(book.id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProducts;
