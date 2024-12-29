import React, { useState, useEffect } from "react";
import "./ViewReports.css";
import "./ManageProducts.css";
import Modal from "../components/Modal/Modal";
import ErrorModal from "./ErrorModal";

const ViewReport = () => {
    const [filters, setFilters] = useState({ category: '', startDate: '', endDate: '' });
    const [reports] = useState([
        { category: 'active-users', metric: 'Active Users', value: 120, date: '2024-11-01' },
        { category: 'book-ratings', metric: 'Average Ratings', value: 4.5, date: '2024-11-02' },
        { category: 'interaction-rates', metric: 'Interaction Rate', value: 75, date: '2024-11-03' },
        { category: 'top-read-books', metric: 'Top Read Books', value: 'Book A, Book B', date: '2024-11-04' },
        { category: 'inactive-users', metric: 'Inactive Users', value: 30, date: '2024-11-05' },
    ]);

    const categories = [
        { id: 'active-users', name: 'Active Users' },
        { id: 'book-ratings', name: 'Book Ratings' },
        { id: 'interaction-rates', name: 'Interaction Rates' },
        { id: 'top-read-books', name: 'Top Read Books' },
        { id: 'inactive-users', name: 'Inactive Users' },
    ];

    const filteredReports = reports.filter((report) => {
        const matchesCategory = filters.category ? report.category === filters.category : true;
        const matchesStartDate = filters.startDate
            ? new Date(report.date) >= new Date(filters.startDate)
            : true;
        const matchesEndDate = filters.endDate
            ? new Date(report.date) <= new Date(filters.endDate)
            : true;

        return matchesCategory && matchesStartDate && matchesEndDate;
    });

    const clearFilters = () => {
        setFilters({ category: '', startDate: '', endDate: '' });
    };

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
                    setTimeout(() => setModalVisible(false), 3000); // Auto-close modal after 3 seconds
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
        <div className="view-report">
            <h2>View Reports</h2>
            <div className="filters">
                <label>
                    Category:
                    <select
                        name="category"
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        aria-label="Filter by category"
                    >
                        <option value="">All</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button onClick={clearFilters} className="clear-filters">
                    Clear Filters
                </button>
            </div>

            <div className="report-results">
                {filteredReports.length > 0 ? (
                    <ul>
                        {filteredReports.map((report, index) => (
                            <li key={index} className="report-item">
                                <strong>{report.metric}</strong>: {report.value} ({report.date})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-results">No reports found for the selected filters.</p>
                )}
            </div>

            <div className="manage-products-container">
                <h2>Manage User's Books</h2>
                <p>Review and approve books created by users.</p>
                {errorVisible && (
                    <ErrorModal
                        message={message}
                        onClose={() => setErrorVisible(false)} // Add close button functionality
                    />
                )}
                {modalVisible && (
                    <Modal
                        title={modalType === 'success' ? 'Success' : 'Error'}
                        message={message}
                        type={modalType}
                        onClose={() => setModalVisible(false)} // Add close button functionality
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
        </div>
    );
};

export default ViewReport;
