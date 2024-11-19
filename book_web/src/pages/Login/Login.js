import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContextLogin } from "../../layouts/useContext";
import axios from "axios";
import "./Login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
  const [message, setMessage] = useState(""); // Thông báo modal
  const { setFormLogin, setUser } = useGlobalContextLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Lưu token vào localStorage
      localStorage.setItem("token", token);

      // Cấu hình axios để gửi token trong header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Cập nhật context
      setUser(user);
      setFormLogin(true);

      // Hiển thị modal thông báo thành công
      setMessage("Login successful!");
      setShowModal(true);

      // Chuyển hướng sau khi đóng modal
      setTimeout(() => {
        setShowModal(false);
        navigate("/");
      }, 1000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Login failed. Please try again.";
      setError(errorMsg);
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <h2>LOGIN</h2>
        <p>Please enter your email and password!</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="email_login">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className="pass_login">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <button type="submit" className="button_login">
            Submit
          </button>
        </form>
      </div>

      {/* Modal hiển thị đăng nhập thành công */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal success">
            <h3>Success</h3>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
