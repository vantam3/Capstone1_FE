import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    confirmPassword: '',
  });
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Trạng thái thành công
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        username: formData.email,
        email: formData.email,
        password: password,
        confirm_password: formData.confirmPassword,
        first_name: formData.firstName,
        last_name: formData.lastName,
      });
      setMessage("Registration successful!");
      setIsSuccess(true);
      setShowModal(true); // Hiển thị modal thông báo thành công
    } catch (error) {
      if (error.response && error.response.data.error) {
        // Trích xuất thông báo lỗi rõ ràng từ backend
        setMessage(error.response.data.error);
      } else {
        setMessage("Connection error! Please try again.");
      }
      setIsSuccess(false);
      setShowModal(true); // Hiển thị modal thông báo lỗi
    }
  };

  const closeModal = () => {
    setShowModal(false); // Đóng modal
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <div className="name">
            <input
              type="text"
              name="firstName"
              placeholder="FirstName:"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="name">
            <input
              type="text"
              name="lastName"
              placeholder="LastName:"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="email">
            <input
              type="email"
              name="email"
              placeholder="Email:"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="pass_register">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password:"
            />
          </div>
          <div className="confirmPass">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password:"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="Dangky">
            Sign Up
          </button>
        </form>
        <div className="backlogin">
          <p>
            You have an account? <a href="/login">Back to Sign In</a>
          </p>
        </div>
      </div>

      {/* Modal thông báo */}
      {showModal && (
        <div className="modal-overlay">
          <div className={`modal ${isSuccess ? 'success' : 'error'}`}>
            <h3>{isSuccess ? "Success" : "Error"}</h3>
            <p>{message}</p>
            <button className="close-modal-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
