import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./Profile.css";

function Profile() {
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(true); // Đặt mặc định là true để vào trang là chế độ chỉnh sửa
  const [showModal, setShowModal] = useState(true);
  const [isChangingPassword, setIsChangingPassword] = useState(false); // Để quản lý trạng thái thay đổi mật khẩu
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();

  // Fetch thông tin người dùng từ backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      console.error("Token or User ID not found.");
      navigate("/login"); // Chuyển hướng đến trang đăng nhập nếu không có token hoặc user_id
      return;
    }

    // Gọi API để lấy thông tin người dùng
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/profile/${userId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );
        setUserInfo(response.data); // Lưu thông tin người dùng vào state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]); // Dependency để điều chỉnh khi navigate thay đổi

  // Cập nhật thông tin người dùng
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      console.error("Token or User ID not found.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/user/profile/update/${userId}/`,
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        }
      );
      setUserInfo(response.data); // Cập nhật lại thông tin sau khi lưu
      setIsEditing(false); // Tắt chế độ chỉnh sửa

      // Cập nhật lại thông tin trong localStorage
      localStorage.setItem("first_name", response.data.first_name);
      localStorage.setItem("last_name", response.data.last_name);
      localStorage.setItem("email", response.data.email);

      // Hiển thị thông báo thành công
      Swal.fire({
        title: "Success",
        text: "Profile updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Tắt modal và quay lại trang trước khi có thay đổi
        setShowModal(false);
        navigate(-1); // Quay lại trang trước
      });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Quay lại trang trước đó
  const handleBack = () => {
    setShowModal(false); // Tắt modal khi quay lại
    navigate(-1); // Quay lại trang trước
  };

  // Xử lý thay đổi thông tin người dùng
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // Xử lý thay đổi mật khẩu
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  // Xử lý khi nhấn nút Save mật khẩu
  const handleSavePassword = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/change-password/`, // Endpoint thay đổi mật khẩu
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        }
      );
      setPasswordData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
      setIsChangingPassword(false); // Tắt chế độ thay đổi mật khẩu

      Swal.fire({
        title: "Success",
        text: "Password changed successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to change password. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Xử lý khi nhấn Cancel thay đổi mật khẩu
  const handleCancelPasswordChange = () => {
    setPasswordData({
      old_password: "",
      new_password: "",
      confirm_password: "",
    });
    setIsChangingPassword(false); // Tắt chế độ thay đổi mật khẩu
  };

  // Xử lý khi nhấn nút Cancel, đóng modal và quay lại trang trước
  const handleCancel = () => {
    setIsEditing(false); // Tắt chế độ chỉnh sửa
    setShowModal(false); // Đóng modal
    navigate(-1); // Quay lại trang trước
  };

  return (
    <>
      {showModal && (
        <div className="overlay">
          <div className="modal">
            <button className="back-button" onClick={handleBack}>
              <span className="chevron-left">←</span> Back
            </button>
            <h2>User Profile</h2>
            <div className="profile-info">
              <div>
                <strong>First Name:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    name="first_name"
                    value={userInfo.first_name}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{userInfo.first_name}</p>
                )}
              </div>
              <div>
                <strong>Last Name:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    name="last_name"
                    value={userInfo.last_name}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{userInfo.last_name}</p>
                )}
              </div>
              <div>
                <strong>Email:</strong>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{userInfo.email}</p>
                )}
              </div>
            </div>
            {isEditing ? (
              <div className="actions">
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
            {/* Phần thay đổi mật khẩu */}
            <div className="change-password-section">
            {isChangingPassword ? (
                <div>
                <div>
                    <label>Old Password:</label>
                    <input
                    type="password"
                    name="old_password"
                    value={passwordData.old_password}
                    onChange={handlePasswordChange}
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                    type="password"
                    name="new_password"
                    value={passwordData.new_password}
                    onChange={handlePasswordChange}
                    />
                </div>
                <div>
                    <label>Confirm New Password:</label>
                    <input
                    type="password"
                    name="confirm_password"
                    value={passwordData.confirm_password}
                    onChange={handlePasswordChange}
                    />
                </div>
                <div>
                    <button
                    className="save-button"
                    onClick={handleSavePassword}
                    >
                    Save
                    </button>
                    <button
                    className="cancel-button"
                    onClick={handleCancelPasswordChange}
                    >
                    Cancel
                    </button>
                </div>
                </div>
            ) : (
                <button
                className="change-password-button"
                onClick={() => setIsChangingPassword(true)}
                >
                Change Password
                </button>
            )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
