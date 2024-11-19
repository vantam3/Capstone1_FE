import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminLayout.css';

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-content">
                <Outlet /> {/* Nội dung sẽ thay đổi dựa trên route */}
            </div>
        </div>
    );
};

export default AdminLayout;
