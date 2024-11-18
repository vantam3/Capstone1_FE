import React, { useState } from 'react';
import './ManageProducts.css';

const ManageProducts = () => {
    const [products, setProducts] = useState([
        { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Fiction', status: 'Available' },
        { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Non-Fiction', status: 'Out of Stock' },
        { id: 3, title: 'Book 3', author: 'Author 3', genre: 'Fantasy', status: 'Available' },
    ]);

    const handleDelete = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this product?');
        if (confirmed) {
            setProducts(products.filter((product) => product.id !== id));
        }
    };

    const handleAddProduct = () => {
        alert('Add Product functionality goes here');
    };

    const handleEditProduct = (id) => {
        alert(`Edit Product functionality for ID: ${id}`);
    };

    return (
        <div className="manage-products-container">
            <h2>Manage Products</h2>
            <p>Manage books and other products here.</p>
            <button className="add-product-button" onClick={handleAddProduct}>
                Add Product
            </button>
            <table className="products-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.author}</td>
                            <td>{product.genre}</td>
                            <td>{product.status}</td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => handleEditProduct(product.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProducts;
