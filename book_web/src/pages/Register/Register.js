import React, { useState } from 'react';
import './Register.css';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        // Kiểm tra nếu mật khẩu và nhập lại mật khẩu khớp nhau
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }

        setError('');
        // Gửi dữ liệu đăng ký (có thể gọi API tại đây)
        console.log('User registered:', formData);
    };

    // Xử lý đăng nhập với Google
    const handleGoogleSignIn = () => {
        // Thực hiện logic đăng nhập với Google (tùy vào tích hợp API Google)
        console.log('Signing in with Google...');
    };

    return (
        <div className="register-container">
            <h1>Đăng Ký</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <label>
                    Họ:
                    <input 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <label>
                    Tên:
                    <input 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <label>
                    Email:
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <label>
                    Mật khẩu:
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <label>
                    Nhập lại mật khẩu:
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="register-button">Đăng Ký</button>
            </form>
            <p>Hoặc tiếp tục với</p>
            <button onClick={handleGoogleSignIn} className="google-signin-button">
                Google
            </button>
        </div>
    );
}

export default Register;
