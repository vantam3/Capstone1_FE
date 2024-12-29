import React, { useState, useEffect } from "react";
import "./ViewReports.css";
import "./ManageProducts.css";
import Modal from "../components/Modal/Modal";
import ErrorModal from "./ErrorModal";

const ViewReport = () => {
  // Trạng thái cho báo cáo tổng quan
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

  // Trạng thái cho quản lý sách người dùng
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('success');
  const [errorVisible, setErrorVisible] = useState(false);

  // Fetch báo cáo và sách người dùng khi component mount
  useEffect(() => {
    fetchReportData();
    fetchBooks();
  }, []);

  // Hàm fetch dữ liệu báo cáo từ backend
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

  // Hàm fetch sách người dùng từ backend
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

  // Hàm xử lý duyệt sách
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
          const result = await response.json();
          setModalType('success');
          setMessage(result.message || 'Book approved successfully!');
          setModalVisible(true);
          fetchBooks(); // Cập nhật lại danh sách
        } else {
          const errorData = await response.json();
          setModalType('error');
          setMessage(errorData.message || 'Failed to approve book.');
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

      {/* Quản lý sách người dùng */}
      <div className="manage-products-container">
        <h2>Manage User's Books</h2>
        <p>Review and approve books created by users.</p>
        {errorVisible && (
          <ErrorModal
            message={message}
            onClose={() => setErrorVisible(false)} // Thêm chức năng đóng modal
          />
        )}
        {modalVisible && (
          <Modal
            title={modalType === 'success' ? 'Success' : 'Error'}
            message={message}
            type={modalType}
            onClose={() => setModalVisible(false)} // Thêm chức năng đóng modal
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
