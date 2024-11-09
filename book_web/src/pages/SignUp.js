import React from 'react';
import './FormPages.css';

function Signup() {
    return (
        <div className="form-container">
            <h2>Đăng ký</h2>
            <form>
                <input type="text" placeholder="Tên người dùng" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Mật khẩu" required />
                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
}

export default Signup;
