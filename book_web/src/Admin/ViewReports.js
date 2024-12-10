import React, { useState } from 'react';
import './ViewReports.css';

const ViewReport = () => {
    const [filters, setFilters] = useState({ category: '', startDate: '', endDate: '' });
    const [reports] = useState([
        { category: 'active-users', metric: 'Active Users', value: 120, date: '2024-11-01' },
        { category: 'book-ratings', metric: 'Average Ratings', value: 4.5, date: '2024-11-02' },
        { category: 'interaction-rates', metric: 'Interaction Rate', value: 75, date: '2024-11-03' },
        { category: 'revenue-statistics', metric: 'Total Revenue', value: 1500, date: '2024-11-04' },
    ]);

    const categories = [
        { id: 'active-users', name: 'Active Users' },
        { id: 'book-ratings', name: 'Book Ratings' },
        { id: 'interaction-rates', name: 'Interaction Rates' },
        { id: 'revenue-statistics', name: 'Revenue Statistics' },
        { id: 'top-borrowed-books', name: 'Top Borrowed Books' },
        { id: 'inactive-users', name: 'Inactive Users' },
        { id: 'feedback-suggestions', name: 'Feedback and Suggestions' },
    ];

    // Filter reports based on filters
    const filteredReports = reports.filter((report) => {
        const matchesCategory = filters.category ? report.category === filters.category : true;
        const matchesStartDate = filters.startDate
            ? new Date(report.date) >= new Date(filters.startDate)
            : true;
        const matchesEndDate = filters.endDate
            ? new Date(report.date) <= new Date(filters.endDate)
            : true;

        return matchesCategory && matchesStartDate && matchesEndDate;
    });

    const clearFilters = () => {
        setFilters({ category: '', startDate: '', endDate: '' });
    };

    return (
        <div className="view-report">
            <h2>View Reports</h2>
            <div className="filters">
                <label>
                    Category:
                    <select
                        name="category"
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        aria-label="Filter by category"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Start Date:
                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                        aria-label="Filter by start date"
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                        aria-label="Filter by end date"
                    />
                </label>
                <button onClick={clearFilters} className="clear-filters">
                    Clear Filters
                </button>
            </div>

            <div className="report-results">
                {filteredReports.length > 0 ? (
                    <ul>
                        {filteredReports.map((report, index) => (
                            <li key={index} className="report-item">
                                <strong>{report.metric}</strong>: {report.value} ({report.date})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-results">No reports found for the selected filters.</p>
                )}
            </div>
        </div>
    );
};

export default ViewReport;