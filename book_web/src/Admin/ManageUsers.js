import React, { useState } from 'react';
import './ManageUsers.css';

const ManageUsers = () => {
    // Dữ liệu mẫu cho danh sách người dùng
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' },
        { id: 3, name: 'Tom Brown', email: 'tom.brown@example.com', role: 'User' },
    ]);

    // Hàm xử lý xóa người dùng
    const handleDelete = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (confirmed) {
            setUsers(users.filter((user) => user.id !== id));
        }
    };

    return (
        <div className="manage-users-container">
            <h2>Manage Users</h2>
            <p>Here you can view, edit, add, or delete users.</p>
            <button className="add-user-button" onClick={() => alert('Add User functionality')}>Add User</button>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="edit-button" onClick={() => alert(`Edit User ID: ${user.id}`)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
