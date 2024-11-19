import React, { useState } from 'react';
import './ViewReports.css';

const ViewReports = () => {
    const [reports, setReports] = useState([
        { id: 1, title: 'Feedback Report', type: 'Feedback', status: 'Pending', date: '2024-11-17' },
        { id: 2, title: 'Performance Analysis', type: 'Analysis', status: 'Completed', date: '2024-11-16' },
        { id: 3, title: 'User Satisfaction Survey', type: 'Survey', status: 'In Progress', date: '2024-11-15' },
    ]);

    const handleViewDetails = (id) => {
        alert(`View details of report ID: ${id}`);
    };

    const handleFilter = (type) => {
        alert(`Filter reports by type: ${type}`);
    };

    return (
        <div className="view-reports-container">
            <h2>View Reports</h2>
            <p>Analyze user feedback and trends here to improve your services.</p>
            <div className="filter-buttons">
                <button onClick={() => handleFilter('Feedback')}>Feedback</button>
                <button onClick={() => handleFilter('Analysis')}>Analysis</button>
                <button onClick={() => handleFilter('Survey')}>Survey</button>
                <button onClick={() => setReports([])}>Clear Filters</button>
            </div>
            <table className="reports-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.length > 0 ? (
                        reports.map((report) => (
                            <tr key={report.id}>
                                <td>{report.id}</td>
                                <td>{report.title}</td>
                                <td>{report.type}</td>
                                <td>{report.status}</td>
                                <td>{report.date}</td>
                                <td>
                                    <button
                                        className="view-button"
                                        onClick={() => handleViewDetails(report.id)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>
                                No reports to display
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewReports;
