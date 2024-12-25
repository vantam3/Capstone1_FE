import React, { useState, useEffect } from "react";
import "./ManageProducts.css";
import Modal from "../components/Modal/Modal";
import ErrorModal from "./ErrorModal";

const ManageUserBooks = () => {
    const [books, setBooks] = useState([]);
    const [message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('success');
    const [errorVisible, setErrorVisible] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/list-user-books/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setBooks(data);
            } else {
                setMessage('Failed to fetch books.');
                setErrorVisible(true);
            }
        } catch (error) {
            setMessage('An error occurred while fetching books.');
            setErrorVisible(true);
        }
    };

    const handleApprove = async (id) => {
        const confirmed = window.confirm("Are you sure you want to approve this book?");
        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:8000/api/approve-user-book/${id}/`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    setModalType('success');
                    setMessage('Book approved successfully!');
                    setModalVisible(true);
                    fetchBooks();
                } else {
                    setModalType('error');
                    setMessage('Failed to approve book.');
                    setModalVisible(true);
                }
            } catch (error) {
                setModalType('error');
                setMessage('An error occurred while approving the book.');
                setModalVisible(true);
            }
        }
    };

    return (
        <div className="manage-products-container">
            <h2>Manage User's Books</h2>
            <p>Review and approve books created by users.</p>
            {errorVisible && <ErrorModal message={message} />}
            {modalVisible && (
                <Modal
                    title={modalType === 'success' ? 'Success' : 'Error'}
                    message={message}
                    type={modalType}
                    onClose={() => setModalVisible(false)}
                />
            )}
            <table className="products-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>{book.description}</td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => handleApprove(book.id)}
                                >
                                    Approve
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUserBooks;