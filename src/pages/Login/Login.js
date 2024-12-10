import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContextLogin } from "../../layouts/useContext";
import "./Login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setFormLogin, setUser } = useGlobalContextLogin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const loggedInUser = {
      name: "Tên người dùng",
      avatar: "/path/to/avatar.jpg",
    };

    setUser(loggedInUser);
    setFormLogin(true);
    navigate("/");
  };

  return (
    <div className="login">
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
        <div className="ketnoi">
          <p>
            Are you a new customer? <a href="/register">Create a new account</a>
          </p>
          <p>
            Forgot password? <a href="/recover">Password recovery</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; // Export mặc định
