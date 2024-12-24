import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './ManageUsers.css';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editingUserData, setEditingUserData] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/admin/users/');
                setUsers(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Failed to load users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

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
            setEditingUserId(null);
            setEditingUserData(null);
            Swal.fire('Success', 'User updated successfully.', 'success');
        } catch (err) {
            console.error('Error updating user:', err);
            Swal.fire('Error', 'Failed to update user. Please try again.', 'error');
        }
    };

    const handleCancelEdit = () => {
        setEditingUserId(null);
        setEditingUserData(null);
    };

    const handleEdit = (user) => {
        setEditingUserId(user.id);
        setEditingUserData({ ...user });
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8000/api/admin/users/${id}/delete/`);
                    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
                    Swal.fire('Deleted!', 'User deleted successfully.', 'success');
                } catch (err) {
                    console.error('Error deleting user:', err);
                    Swal.fire('Error', 'Failed to delete user. Please try again.', 'error');
                }
            }
        });
    };

    if (loading) {
        return <p className="manage-users-error">Loading users...</p>;
    }

    if (error) {
        return <p className="manage-users-error">{error}</p>;
    }

    return (
        <div className="manage-users-container">
            <h2 className="manage-users-header">Manage Users</h2>
            <p className="manage-users-description">Here you can view, edit, add, or delete users.</p>
            <button
                className="manage-users-add-button"
                onClick={() => Swal.fire('Info', 'Add User functionality not implemented yet.', 'info')}
            >
                Add User
            </button>
            <table className="manage-users-table">
                <thead>
                    <tr>
                        <th className="manage-users-table-th">ID</th>
                        <th className="manage-users-table-th">Username</th>
                        <th className="manage-users-table-th">Email</th>
                        <th className="manage-users-table-th">Role</th>
                        <th className="manage-users-table-th">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className={user.id % 2 === 0 ? 'manage-users-table-row-even' : ''}
                        >
                            <td>{user.id}</td>
                            <td>
                                {editingUserId === user.id ? (
                                    <input
                                        className="manage-users-edit-input"
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
                                        className="manage-users-edit-input"
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
                                        <button className="manage-users-save-button" onClick={handleSave}>
                                            Save
                                        </button>
                                        <button className="manage-users-cancel-button" onClick={handleCancelEdit}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="manage-users-edit-button" onClick={() => handleEdit(user)}>
                                            Edit
                                        </button>
                                        <button
                                            className="manage-users-delete-button"
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