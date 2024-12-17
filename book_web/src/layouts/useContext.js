import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalLoginContext = createContext();

export const GlobalLoginProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Lưu thông tin user
  const [formLogin, setFormLogin] = useState(false); // Kiểm tra trạng thái đăng nhập

  // Hàm lấy access token
  const getAccessToken = async () => {
    let accessToken = localStorage.getItem("token");
    if (!accessToken) {
      accessToken = await refreshAccessToken(); // Nếu không có access token, refresh lại
    }
    return accessToken;
  };

  // Hàm refresh access token
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      return null;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/token/refresh/", {
        refresh_token: refreshToken,
      });
      const { access_token } = response.data;
      localStorage.setItem("token", access_token); // Lưu access token mới
      return access_token;
    } catch (error) {
      console.error("Refresh token failed:", error);
      return null;
    }
  };

  // Kiểm tra và lấy thông tin người dùng khi reload trang
  useEffect(() => {
    const loadUserData = async () => {
      const token = await getAccessToken();
      if (token) {
        try {
          const response = await axios.get("http://localhost:8000/user/profile/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data); // Lưu thông tin người dùng vào state
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null); // Nếu không có token, user sẽ bị sign out
      }
    };

    loadUserData();
  }, []); // Chỉ chạy một lần khi trang được load lại

  // Logout và xóa thông tin người dùng
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
