import React from "react";
import "./SeccessLogin.css";

function SeccessLogin() {
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

export default SeccessLogin;
