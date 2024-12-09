import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageUsers.css';

const ManageUsers = () => {
    const [users, setUsers] = useState([]); // State để lưu danh sách người dùng
    const [loading, setLoading] = useState(true); // Trạng thái đang tải
    const [error, setError] = useState(null); // Trạng thái lỗi
    const [editingUserId, setEditingUserId] = useState(null); // ID người dùng đang chỉnh sửa
    const [editingUserData, setEditingUserData] = useState(null); // Dữ liệu người dùng đang chỉnh sửa

    // Gọi API để lấy danh sách người dùng
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/admin/users/');
                setUsers(response.data); // Lưu dữ liệu từ API vào state
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Failed to load users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Hàm xử lý cập nhật người dùng
    const handleSave = async () => {
        if (!editingUserData) return;

        try {
            const response = await axios.put(
                `http://localhost:8000/api/admin/users/${editingUserId}/update/`,
                {
                    username: editingUserData.username,
                    email: editingUserData.email,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === editingUserId ? { ...user, ...response.data } : user
                )
            );
            setEditingUserId(null); // Hủy chế độ chỉnh sửa
            setEditingUserData(null); // Xóa dữ liệu chỉnh sửa
            alert('User updated successfully.');
        } catch (err) {
            console.error('Error updating user:', err);
            alert('Failed to update user. Please try again.');
        }
    };

    // Hàm xử lý hủy bỏ chỉnh sửa
    const handleCancelEdit = () => {
        setEditingUserId(null); // Hủy chế độ chỉnh sửa
        setEditingUserData(null); // Xóa dữ liệu chỉnh sửa
    };

    // Hàm xử lý chỉnh sửa người dùng
    const handleEdit = (user) => {
        setEditingUserId(user.id); // Đặt ID người dùng đang chỉnh sửa
        setEditingUserData({ ...user }); // Sao chép dữ liệu người dùng để chỉnh sửa
    };

    // Hàm xử lý xóa người dùng
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8000/api/admin/users/${id}/delete/`);
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
                alert('User deleted successfully.');
            } catch (err) {
                console.error('Error deleting user:', err);
                alert('Failed to delete user. Please try again.');
            }
        }
    };

    // Hiển thị loading khi dữ liệu đang được tải
    if (loading) {
        return <p>Loading users...</p>;
    }

    // Hiển thị lỗi nếu có lỗi xảy ra
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="manage-users-container">
            <h2>Manage Users</h2>
            <p>Here you can view, edit, add, or delete users.</p>
            <button
                className="add-user-button"
                onClick={() => alert('Add User functionality')}
            >
                Add User
            </button>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                                {editingUserId === user.id ? (
                                    <input
                                        type="text"
                                        value={editingUserData.username}
                                        onChange={(e) =>
                                            setEditingUserData({ ...editingUserData, username: e.target.value })
                                        }
                                    />
                                ) : (
                                    user.username
                                )}
                            </td>
                            <td>
                                {editingUserId === user.id ? (
                                    <input
                                        type="email"
                                        value={editingUserData.email}
                                        onChange={(e) =>
                                            setEditingUserData({ ...editingUserData, email: e.target.value })
                                        }
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td>{user.is_staff ? 'Admin' : 'User'}</td>
                            <td>
                                {editingUserId === user.id ? (
                                    <>
                                        <button className="save-button" onClick={handleSave}>
                                            Save
                                        </button>
                                        <button className="cancel-button" onClick={handleCancelEdit}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="edit-button" onClick={() => handleEdit(user)}>
                                            Edit
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
