import React, { useState, useEffect } from "react";
import "./ViewReports.css";
import "./ManageProducts.css";
import Modal from "../components/Modal/Modal";
import ErrorModal from "./ErrorModal";

const ViewReport = () => {
  const [reportData, setReportData] = useState({
    total_books: 0,
    total_reads: 0,
    most_read_book: {
      id: 0,
      title: "",
      author: "",
      read_count: 0,
    },
    total_users: 0,
    total_reviews: 0,
    average_rating: 0,
  });

  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('success');
  const [errorVisible, setErrorVisible] = useState(false);

  // Fetch report data and book data on component mount
  useEffect(() => {
    fetchReportData();
    fetchBooks();
  }, []);

  // Fetch report statistics from backend
  const fetchReportData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/report-statistics/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReportData(data);
      } else {
        setMessage('Failed to fetch report data.');
        setErrorVisible(true);
      }
    } catch (error) {
      setMessage('An error occurred while fetching report data.');
      setErrorVisible(true);
    }
  };

  // Fetch user books from backend
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

      {/* Thông tin tổng quan */}
      <div className="report-overview">
        <p><strong>Total Books:</strong> {reportData.total_books}</p>
        <p><strong>Total Reads:</strong> {reportData.total_reads}</p>
        <p><strong>Most Read Book:</strong></p>
        <ul>
          <li><strong>Title:</strong> {reportData.most_read_book.title}</li>
          <li><strong>Author:</strong> {reportData.most_read_book.author}</li>
          <li><strong>Read Count:</strong> {reportData.most_read_book.read_count}</li>
        </ul>
        <p><strong>Total Users:</strong> {reportData.total_users}</p>
        <p><strong>Total Reviews:</strong> {reportData.total_reviews}</p>
        <p><strong>Average Rating:</strong> {reportData.average_rating.toFixed(1)}</p>
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
