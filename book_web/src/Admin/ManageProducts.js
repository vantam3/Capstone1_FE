import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./ManageProducts.css";

const ManageProducts = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingBookId, setEditingBookId] = useState(null);
  const [editingBookData, setEditingBookData] = useState(null);
  const [keyword, setKeyword] = useState(""); // Từ khóa để tìm sách mới
  const [size, setSize] = useState(20); // Số lượng sách cần thêm

  // Lấy danh sách sách từ API
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/books/");
        setBooks(response.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Thêm sách qua API mới
  const handleAddBooks = async () => {
    if (!keyword.trim()) {
      Swal.fire("Warning", "Please enter a keyword to fetch books.", "warning");
      return;
    }
    if (size <= 0 || size > 100) {
      Swal.fire("Warning", "Please enter a valid size (1-100).", "warning");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/api/admin/fetch-books-genre/", {
        keyword: keyword,
        size: size,
      });
      const newBooks = response.data.books || [];
      setBooks((prevBooks) => [...newBooks, ...prevBooks]);
      Swal.fire( "Books added successfully!", "Success");
    } catch (err) {
      console.error("Error adding books:", err);
      Swal.fire("Error", err.response?.data?.error || "Failed to add books.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Bắt đầu chỉnh sửa
  const handleEdit = (book) => {
    setEditingBookId(book.id);
    setEditingBookData({ ...book });
  };

  // Lưu chỉnh sửa
  const handleSave = async (id) => {
    if (!editingBookData) return;

    setLoading(true);
    try {
      const updatedFields = {};
      Object.keys(editingBookData).forEach((key) => {
        if (editingBookData[key] !== books.find((book) => book.id === id)[key]) {
          updatedFields[key] = editingBookData[key];
        }
      });

      if (Object.keys(updatedFields).length === 0) {
        Swal.fire("Info", "No changes detected.", "info");
        setEditingBookId(null);
        setEditingBookData(null);
        return;
      }

      const response = await axios.put(
        `http://localhost:8000/api/books/${id}/edit/`,
        updatedFields
      );

      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === id ? response.data : book))
      );
      setEditingBookId(null);
      setEditingBookData(null);
      Swal.fire("Success", "Book updated successfully!", "success");
    } catch (err) {
      console.error("Error saving changes:", err);
      Swal.fire("Error", "Failed to save changes. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingBookId(null);
    setEditingBookData(null);
  };

  // Xóa sách
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await axios.delete(`http://localhost:8000/api/books/${id}/delete/`);
          setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
          Swal.fire("Deleted!", "Your book has been deleted.", "success");
        } catch (err) {
          console.error("Error deleting book:", err);
          Swal.fire("Error", "Failed to delete book. Please try again.", "error");
        } finally {
          setLoading(false);
        }
      }
    });
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

      {/* Thanh thêm sách mới */}
      <div className="fetch-books-bar">
        <input
          type="text"
          placeholder="Enter keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="keyword-input"
        />
        <input
          type="number"
          placeholder="Enter size (1-100)..."
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="size-input"
        />
        <button onClick={handleAddBooks} className="fetch-button">
          Add Books
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Bảng hiển thị sách */}
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
                  book.author || "Unknown Author"
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
                  book.subject || "No subject available"
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
                  book.language || "Unknown"
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
                    <button className="delete-button" onClick={() => handleDelete(book.id)}>
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