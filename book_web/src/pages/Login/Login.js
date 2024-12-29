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
  const [isCodeSent, setIsCodeSent] = useState(false); // Track if code is sent
  const [confirmationCode, setConfirmationCode] = useState(""); // Confirmation code
  const [newPassword, setNewPassword] = useState(""); // New password
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); // Confirm new password

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalMessage(""); // Reset message

    try {
      const response = await axios.post("http://localhost:8000/api/login/", { email, password });
      const { token, user } = response.data;

      // Lưu token và id vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user.id); // Lưu user_id vào localStorage

      // Cập nhật thông tin người dùng vào context
      setUser(user);
      setFormLogin(true);

      // Hiển thị thông báo thành công
      setModalMessage("Login successful!");
      setModalType("success");

      try {
        const adminResponse = await axios.get("http://localhost:8000/api/admin_dashboard/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTimeout(() => {
          setModalMessage("");
          if (adminResponse.status === 200 && adminResponse.data.message === "Welcome Admin!") {
            navigate("/admin/dashboard");
          }
        }, 1000);
      } catch (adminResponse) {
        if (adminResponse.status == 403) {
          setTimeout(() => {
            setModalMessage("");
          navigate("/");
          }, 1000);
        }
      }
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
      await axios.post("http://localhost:8000/api/forgot-password/", {
        email: forgotEmail,
      });
      setModalMessage("Confirmation code sent to your email!");
      setModalType("success");
      setIsCodeSent(true);
    } catch (error) {
      setModalMessage(error.response?.data?.error || "Failed to send confirmation code.");
      setModalType("error");
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setModalMessage("Passwords do not match!");
      setModalType("error");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/reset-password/", {
        email: forgotEmail,
        confirmation_code: confirmationCode,
        new_password: newPassword,
      });
      setModalMessage("Password reset successfully!");
      setModalType("success");
      setForgotEmail(""); 
      setConfirmationCode(""); 
      setNewPassword(""); 
      setConfirmNewPassword(""); // Clear fields
      setShowForgotPassword(false); 
      setIsCodeSent(false); 
    } catch (error) {
      setModalMessage(error.response?.data?.error || "Failed to reset password.");
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
          {!isCodeSent ? (
            <form onSubmit={handleForgotPasswordSubmit}>
              <p>Please enter your email to reset your password:</p>
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
          ) : (
            <form onSubmit={handleResetPasswordSubmit}>
              <p>Enter the confirmation code and set a new password:</p>
              <div>
                <input
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  required
                  placeholder="Confirmation Code:"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="New Password:"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  placeholder="Confirm New Password:"
                />
              </div>
              <button type="submit" className="button_reset">
                Reset Password
              </button>
            </form>
          )}
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
