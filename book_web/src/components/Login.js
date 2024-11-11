import React, { useState } from "react";
import "./Login.css";
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>LOG IN</h2>
        <p>Please enter your email and password!</p>
        <form onSubmit={handleSubmit}>
          <div className="email-login">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email:"
            />
          </div>
          <div className="password-login">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password:"
            />
          </div>
          <button type="submit" className="login-button">
            Submit
          </button>
        </form>
        <div className="connections">
          <p>
            Are you a new customer? <Link to="/register">Create a new account</Link>
          </p>
          <p>
            Forgot password? <Link to="/recover">Password recovery</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
