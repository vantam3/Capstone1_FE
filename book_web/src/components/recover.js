import React, { useState } from 'react';
import './recover.css';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
  };

  return (
    <div className="forgot-password-container">
      <div className="card">
       
        <img src={`${process.env.PUBLIC_URL}/img/Forgot_password.jpg`} alt="Forgot Password" />
        <h2>FORGOT YOUR PASSWORD?</h2>
        <p>Don't worry, our team will help you to login again.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-recover">
            <label htmlFor="email">Enter Your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
            />
          </div>
          <button type="submit" className="submit-button">Send</button>
        </form>
        <p className="signin-text">
          Already have an account? <Link to="/login">SIGN IN</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
