import React, { useState, useEffect } from "react";
import "./ViewReports.css";
import Modal from "../components/Modal/Modal";

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
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("info");
  const [previewText, setPreviewText] = useState(""); // Nội dung sách
  const [previewVisible, setPreviewVisible] = useState(false); // Modal preview

  useEffect(() => {
    fetchReportData();
    fetchBooks();
  }, []);

  const fetchReportData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/report-statistics/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReportData(data);
      } else {
        showError("Failed to fetch report data.");
      }
    } catch (error) {
      showError("An error occurred while fetching report data.");
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/list-user-books/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        showError("Failed to fetch books.");
      }
    } catch (error) {
      showError("An error occurred while fetching books.");
    }
  };

  const showError = (errorMessage) => {
    setMessage(errorMessage);
    setModalType("error");
    setModalVisible(true);
  };

  const handleApprove = async (id) => {
    const confirmed = window.confirm("Are you sure you want to approve this book?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8000/api/approve-user-book/${id}/`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setModalType("success");
          setMessage(result.message || "Book approved successfully!");
          setModalVisible(true);
          fetchBooks();
        } else {
          const errorData = await response.json();
          showError(errorData.message || "Failed to approve book.");
        }
      } catch (error) {
        showError("An error occurred while approving the book.");
      }
    }
  };

  const handleReject = async (id) => {
    const confirmed = window.confirm("Are you sure you want to reject and delete this book?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8000/api/reject-delete-book/${id}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setModalType("success");
          setMessage(result.message || "Book rejected and deleted successfully!");
          setModalVisible(true);
          fetchBooks();
        } else {
          const errorData = await response.json();
          showError(errorData.message || "Failed to reject and delete the book.");
        }
      } catch (error) {
        showError("An error occurred while rejecting and deleting the book.");
      }
    }
  };

  const handlePreview = (content) => {
    setPreviewText(content); // Lấy nội dung sách từ dữ liệu đã fetch
    setPreviewVisible(true); // Hiển thị modal preview
  };

  return (
    <div className="view-report-container">
      <h2>View Reports</h2>

      {/* Tổng quan báo cáo */}
      <div className="view-report-overview">
        <p>
          <strong>Total Books:</strong> {reportData.total_books}
        </p>
        <p>
          <strong>Total Reads:</strong> {reportData.total_reads}
        </p>
        <p>
          <strong>Most Read Book:</strong>
        </p>
        <ul>
          <li>
            <strong>Title:</strong> {reportData.most_read_book.title}
          </li>
          <li>
            <strong>Author:</strong> {reportData.most_read_book.author}
          </li>
          <li>
            <strong>Read Count:</strong> {reportData.most_read_book.read_count}
          </li>
        </ul>
        <p>
          <strong>Total Users:</strong> {reportData.total_users}
        </p>
        <p>
          <strong>Total Reviews:</strong> {reportData.total_reviews}
        </p>
        <p>
          <strong>Average Rating:</strong> {reportData.average_rating.toFixed(1)}
        </p>
      </div>

      {/* Modal Preview */}
      {previewVisible && (
        <Modal
          title="Book Preview"
          message={previewText}
          type="info"
          onClose={() => setPreviewVisible(false)} // Đóng modal preview
        />
      )}

      {/* Modal Errors */}
      {modalVisible && (
        <Modal
          title={modalType === "success" ? "Success" : "Error"}
          message={message}
          type={modalType}
          onClose={() => setModalVisible(false)}
        />
      )}

      {/* Quản lý sách người dùng */}
      <div className="view-report-manage-books-container">
        <h2>Manage User's Books</h2>
        <p>Review and manage books created by users.</p>
        <table className="view-report-products-table">
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
                  <div className="view-report-action-buttons">
                    <button className="view-report-preview-button" onClick={() => handlePreview(book.content)}>
                      Preview
                    </button>
                    <button className="view-report-edit-button" onClick={() => handleApprove(book.id)}>
                      Approve
                    </button>
                    <button className="view-report-reject-button" onClick={() => handleReject(book.id)}>
                      Reject
                    </button>
                  </div>
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
