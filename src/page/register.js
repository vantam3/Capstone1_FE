import React, { useState } from 'react';
import './register.css'; 

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    gender: '',
    dob: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="register-container">
      <div className="breadcrumb_login">
        <a href="/HomePage">HomePage</a> {'<'} 
      </div>
      <div className="register-box">
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <div className="name">
            <input
              type="text"
              name="lastName"
              placeholder="FirstName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="name">
            <input
              type="text"
              name="LastName"
              placeholder="LastName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="name gender">
            <label>
              <input
                type="radio"
                name="gender"
                value="Woman"
                checked={formData.gender === 'Woman'}
                onChange={handleChange}
              />
              Woman
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Man"
                checked={formData.gender === 'Man'}
                onChange={handleChange}
              />
              Man
            </label>
          </div>
          <div className="birth">
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              placeholder="mm/dd/yyyy"
              required
            />
          </div>
          <div className="email">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="Dangky">Sign Up</button>
        </form>
        <div className="backlogin">
        <p>
            You have an account? <a href="/recover">Back to SignIn</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
