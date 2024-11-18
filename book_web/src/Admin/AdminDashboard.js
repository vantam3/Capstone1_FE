import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate(); 

    return (
        <div className="dashboard-container">
            <h1>Welcome Back, Admin</h1>
            <p>Manage your system effectively from here.</p>
            <div className="dashboard-cards">
                {/* Thẻ Manage Products */}
                <div className="dashboard-card">
                    <h2>Manage Products</h2>
                    <p>View, add, edit, or delete books and other products.</p>
                    <button onClick={() => navigate('/admin/manage-products')}>View Products</button>
                </div>

                {/* Thẻ Manage Users */}
                <div className="dashboard-card">
                    <h2>Manage Users</h2>
                    <p>Manage user accounts and their roles efficiently.</p>
                    <button onClick={() => navigate('/admin/manage-users')}>View Users</button>
                </div>

                {/* Thẻ View Reports */}
                <div className="dashboard-card">
                    <h2>View Reports</h2>
                    <p>Analyze user feedback and performance data.</p>
                    <button onClick={() => navigate('/admin/view-reports')}>View Reports</button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
