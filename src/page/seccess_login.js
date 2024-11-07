import React from "react";
import "./seccess_login.css";

function Seccess_Login() {
  return (
    <div className="login-success">
      <div className="success-icon">
        <i className="checkmark">&#10003;</i>
      </div>
      <p className="success-message">Login Successfully</p>
      <button className="ok-button">OK</button>
    </div>
  );
}

export default Seccess_Login;
