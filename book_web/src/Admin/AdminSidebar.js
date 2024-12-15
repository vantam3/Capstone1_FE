import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminLayout.css';

const AdminSidebar = () => {
    return (
        <div className="admin-sidebar">
            <h2>ADMIN BOOKQUEST </h2>
            <nav>
                <NavLink to="/admin/dashboard" activeClassName="active-link">Dashboard</NavLink>
                <NavLink to="/admin/manage-users" activeClassName="active-link">Manage Users</NavLink>
                <NavLink to="/admin/manage-products" activeClassName="active-link">Manage Products</NavLink>
                <NavLink to="/admin/manage-user-books">Manage User Books</NavLink>
                <NavLink to="/admin/view-reports" activeClassName="active-link">View Reports</NavLink>
                <NavLink to="/admin/logout" activeClassName="active-link">Log Out</NavLink>
            </nav>
        </div>
    );
};

export default AdminSidebar;
