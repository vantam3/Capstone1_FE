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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState(""); 
  const [confirmationCode, setConfirmationCode] = useState(""); 
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); // Added for confirm password
  const [isCodeSent, setIsCodeSent] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalMessage(""); 

    try {
      const response = await axios.post("http://localhost:8000/api/login/", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user.id);

      setUser(user);
      setFormLogin(true);

      setModalMessage("Login successful!");
      setModalType("success");

      setTimeout(() => {
        setModalMessage("");
        navigate("/");
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
      setModalMessage("New password and confirmation password do not match!");
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
      setConfirmNewPassword(""); // Clear confirmation password
      setShowForgotPassword(false); 
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
            <div>
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
            </div>
          ) : (
            <div>
              <p>Enter the confirmation code and set a new password:</p>
              <form onSubmit={handleResetPasswordSubmit}>
                <div>
                  <label>Confirmation Code:</label>
                  <input
                    type="text"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    required
                    placeholder="Confirmation Code:"
                  />
                </div>
                <div>
                  <label>New Password:</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="New Password:"
                  />
                </div>
                <div>
                  <label>Confirm New Password:</label>
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
            </div>
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
