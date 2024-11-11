import React, { useState } from "react";
import "./Login.css";
import { useGlobalContextLoin } from "../../layouts/useContext";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setFormLogin } = useGlobalContextLoin();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    navigate("/");
    setFormLogin(true);
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

export default LoginForm;
