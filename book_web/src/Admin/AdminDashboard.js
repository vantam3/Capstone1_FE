import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement, // Đăng ký PointElement
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký tất cả các thành phần cần thiết
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement, // Thêm PointElement
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  const productData = {
    labels: ['Books', 'Magazines', 'E-Books'],
    datasets: [
      {
        label: 'Products',
        data: [50, 30, 20],
        backgroundColor: ['#79ACD9', '#F5A623', '#FF6F61'],
      },
    ],
  };

  const userData = {
    labels: ['Users', 'Moderators', 'Admins'],
    datasets: [
      {
        label: 'Roles',
        data: [200, 50, 10],
        backgroundColor: ['#79ACD9', '#F5A623', '#FF6F61'],
      },
    ],
  };

  const reportData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Feedback Score',
        data: [70, 85, 90, 95],
        fill: false,
        borderColor: '#79ACD9',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome Back, Admin</h1>
      <p>Manage your system effectively from here.</p>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>Manage Products</h2>
          <Bar data={productData} />
          <button onClick={() => navigate('/admin/manage-products')}>View Products</button>
        </div>

        <div className="dashboard-card">
          <h2>Manage Users</h2>
          <Pie data={userData} />
          <button onClick={() => navigate('/admin/manage-users')}>View Users</button>
        </div>

        <div className="dashboard-card">
          <h2>View Reports</h2>
          <Line data={reportData} />
          <button onClick={() => navigate('/admin/view-reports')}>View Reports</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
