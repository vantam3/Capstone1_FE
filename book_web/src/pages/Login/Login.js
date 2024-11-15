import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContextLogin } from "../../layouts/useContext";
import axios from "axios";
import "./Login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setFormLogin, setUser } = useGlobalContextLogin();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email: email,
        password: password,
      });

      // Lưu token vào localStorage 
      localStorage.setItem("token", response.data.token);

      // Thiết lập thông tin người dùng
      setUser({ name: response.data.username, avatar: "/path/to/avatar.jpg" });
      setFormLogin(true);
      navigate("/");  
    } catch (err) {
      console.log(err.response);
      setError("Incorrect email or password");
    }
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="button_login">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
