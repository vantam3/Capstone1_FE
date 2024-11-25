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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalMessage("");

    try {
      const response = await axios.post("http://localhost:8000/api/login/", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);

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
      </div>
    </div>
  );
};

export default LoginForm;
