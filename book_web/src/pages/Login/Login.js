import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContextLogin } from "../../layouts/useContext";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import "./Login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setFormLogin, setUser } = useGlobalContextLogin();
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Toggle forgot password form
  const [forgotEmail, setForgotEmail] = useState(""); // Email for forgot password

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalMessage("");

    try {
      const response = await axios.post("http://localhost:8000/api/login/", { email, password });
      const { token, user } = response.data;

      // Lưu token vào localStorage
      localStorage.setItem("token", token);

      setUser(user);
      setFormLogin(true);
      setModalMessage("Login successful!");
      setModalType("success");

      // Gọi API để kiểm tra quyền admin
      const adminResponse = await axios.get("http://localhost:8000/api/admin_dashboard/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Điều hướng dựa trên phản hồi từ backend
      setTimeout(() => {
        setModalMessage("");
        if (adminResponse.status === 200 && adminResponse.data.message === "Welcome Admin!") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (err) {
      setModalMessage(err.response?.data?.message || "Login failed. Please try again.");
      setModalType("error");
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setModalMessage("Submitting request...");
    setModalType("success");

    try {
      const response = await axios.post("http://localhost:8000/api/forgot-password/", {
        email: forgotEmail,
      });
      setModalMessage("Password reset email sent successfully!");
      setModalType("success");
      setForgotEmail(""); // Clear email field after successful submission
      setShowForgotPassword(false); // Return to login form
    } catch (error) {
      setModalMessage(error.response?.data?.error || "Failed to send password reset email.");
      setModalType("error");
    }
  };

  return (
    <div className="login">
      {modalMessage && (
        <Modal
          title={modalType === "success" ? "Success" : "Error"}
          message={modalMessage}
          onClose={() => setModalMessage("")}
          type={modalType}
        />
      )}

      {showForgotPassword ? (
        <div className="forgot-password-box">
          <h2>Forgot Password</h2>
          <p>Please enter your email to reset your password:</p>
<form onSubmit={handleForgotPasswordSubmit}>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
              placeholder="Email:"
            />
            <button type="submit" className="button_forgot">
              Submit
            </button>
          </form>
          <button onClick={() => setShowForgotPassword(false)} className="button_cancel">
            Back to Login
          </button>
        </div>
      ) : (
        <div className="login-box">
          <h2>LOG IN</h2>
          <p>Please enter your email and password!</p>
          <form onSubmit={handleSubmit}>
            <div className="email_login">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email:"
              />
            </div>
            <div className="pass_login">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password:"
              />
            </div>
            <button type="submit" className="button_login">
              Submit
            </button>
          </form>
          <p className="forgot-password-link">
            <button onClick={() => setShowForgotPassword(true)} className="link-button">
              Forgot password?
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;