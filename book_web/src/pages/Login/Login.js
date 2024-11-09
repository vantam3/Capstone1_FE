import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        if (!formData.email || !formData.password) {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }

        setError('');
        // Gửi dữ liệu đăng nhập (có thể gọi API tại đây)
        console.log('User logged in:', formData);
    };

    // Xử lý đăng nhập với Google
    const handleGoogleSignIn = () => {
        // Thực hiện logic đăng nhập với Google (tùy vào tích hợp API Google)
        console.log('Signing in with Google...');
    };

    return (
        <div className="login-container">
            <h1>Đăng Nhập</h1>
            <form onSubmit={handleSubmit} className="login-form">
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
                {error && <p className="error">{error}</p>}
                <button type="submit" className="login-button">Đăng Nhập</button>
            </form>
            <p>Hoặc tiếp tục với</p>
            <button onClick={handleGoogleSignIn} className="google-signin-button">
                Đăng nhập với Google
            </button>
        </div>
    );
}

export default Login;
