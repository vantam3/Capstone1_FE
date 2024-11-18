import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const GlobalLoginContext = createContext();

export const GlobalLoginProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Lưu thông tin user
  const [formLogin, setFormLogin] = useState(false); // Kiểm tra trạng thái đăng nhập

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        await axios.post("http://localhost:8000/api/logout/", {
          refresh_token: refreshToken,
        });
      }
      localStorage.removeItem("token"); // Xóa access token
      localStorage.removeItem("refresh_token"); // Xóa refresh token
      setUser(null);
      setFormLogin(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <GlobalLoginContext.Provider value={{ user, setUser, formLogin, setFormLogin, logout }}>
      {children}
    </GlobalLoginContext.Provider>
  );
};

export const useGlobalContextLogin = () => useContext(GlobalLoginContext);
