import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminLayout.css';

const AdminLayout = () => {
    useEffect(() => {
        document.body.classList.add('admin-page');
        window.scrollTo({
            top: 70,
            behavior: 'instant',
        });

        return () => {
            document.body.classList.remove('admin-page');
        };
    }, []);

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
