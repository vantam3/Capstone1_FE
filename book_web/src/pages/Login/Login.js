import React from 'react';
import './Login.css';


function Login() {
    return (
        <div className="form-container">
            <h2>Đăng nhập</h2>
            <form>
                <input type="text" placeholder="Tên người dùng" required />
                <input type="password" placeholder="Mật khẩu" required />
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
}

export default Login;
