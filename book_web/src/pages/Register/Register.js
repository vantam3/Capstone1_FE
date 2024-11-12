
import React, { useState } from "react";
import "./Register.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    confirmPassword: '',
});
const [password, setPassword] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <div className="name">
            <input
              type="text"
              name="lastName"
              placeholder="FirstName:"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="name">
            <input
              type="text"
              name="LastName"
              placeholder="LastName:"
              value={formData.firstName}
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
              type="Password"
              name="confirmPassword"
              placeholder="ConfirmPassword:"
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
            You have an account? <a href="/login">Back to SignIn</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
