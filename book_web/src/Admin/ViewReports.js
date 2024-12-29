import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
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
        Swal.fire("Error", "Failed to fetch report data.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while fetching report data.", "error");
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
        Swal.fire("Error", "Failed to fetch books.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while fetching books.", "error");
    }
  };

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Approve Book?",
      text: "Are you sure you want to approve this book?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8000/api/approve-user-book/${id}/`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          Swal.fire("Approved!", result.message || "Book approved successfully!", "success");
          fetchBooks();
        } else {
          const errorData = await response.json();
          Swal.fire("Error", errorData.message || "Failed to approve book.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "An error occurred while approving the book.", "error");
      }
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Reject and Delete Book?",
      text: "Are you sure you want to reject and delete this book?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8000/api/reject-delete-book/${id}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          Swal.fire("Deleted!", result.message || "Book rejected and deleted successfully!", "success");
          fetchBooks();
        } else {
          const errorData = await response.json();
          Swal.fire("Error", errorData.message || "Failed to reject and delete the book.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "An error occurred while rejecting and deleting the book.", "error");
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

      <div className="view-report-overview">
        <div className="report-grid">
          <div className="report-card card-1">
            <h3>Total Books</h3>
            <p>{reportData.total_books}</p>
          </div>
          <div className="report-card card-2">
            <h3>Total Reads</h3>
            <p>{reportData.total_reads}</p>
          </div>
          <div className="report-card card-3">
            <h3>The best-selling author</h3>
            <p><strong>Author:</strong> {reportData.most_read_book.author}</p>
            <p><strong>Read Count:</strong> {reportData.most_read_book.read_count}</p>
          </div>
          <div className="report-card card-4">
            <h3>Total Users</h3>
            <p>{reportData.total_users}</p>
          </div>
          <div className="report-card card-5">
            <h3>Total Reviews</h3>
            <p>{reportData.total_reviews}</p>
          </div>
          <div className="report-card card-6">
            <h3>Average Rating</h3>
            <p>{reportData.average_rating.toFixed(1)}</p>
          </div>
        </div>
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
                    <button
                      className="view-report-preview-button"
                      onClick={() => handlePreview(book.content)}
                    >
                      Preview
                    </button>
                    <button
                      className="view-report-edit-button"
                      onClick={() => handleApprove(book.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="view-report-reject-button"
                      onClick={() => handleReject(book.id)}
                    >
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
