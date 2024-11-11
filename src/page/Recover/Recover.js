import React, { useState } from "react";
import "./Recover.css";

const Recover = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
  };

  return (
    <div className="forgot-password-container">
      <div className="card">
        <img
          src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg"
          alt="Forgot Password"
          className="forgot-password-image"
        />
        <h2>FORGOT YOUR PASSWORD?</h2>
        <p>Don't worry our team will help you to login again.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-recover">
            <label htmlFor="email">Enter Your Email</label>
            <div className="input-container">
              <i className="fa fa-envelope"></i>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="letrucphuongquynh03@gmail.com"
                required
              />
            </div>
          </div>
          <button type="submit" className="submit-button">
            Send
          </button>
        </form>
        <p className="signin-text">
          Already have an account? <a href="/login">SIGN IN</a>
        </p>
      </div>
    </div>
  );
};

export default Recover;
