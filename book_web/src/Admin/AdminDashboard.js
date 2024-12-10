import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các phần tử cần thiết của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Dữ liệu biểu đồ hình tròn cho số lượng sách theo thể loại
  const bookCategoryData = {
    labels: ['Fiction', 'Non-fiction', 'Science', 'Fantasy', 'History', 'Biography'], // Các thể loại sách
    datasets: [
      {
        label: 'Number of Books',
        data: [45, 30, 20, 15, 10, 25], // Số lượng sách theo thể loại
        backgroundColor: ['#79ACD9', '#F5A623', '#FF6F61', '#4CAF50', '#8E44AD', '#3498DB'], // Màu sắc cho các phần biểu đồ
        hoverOffset: 4, // Khoảng cách khi di chuột qua
      },
    ],
  };

  // Dữ liệu biểu đồ cho người dùng
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

  // Dữ liệu báo cáo với đánh giá phản hồi
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
        {/* Thẻ biểu đồ hình tròn cho Manage Products */}
        <div className="dashboard-card">
          <h2>Manage Products</h2>
          <Pie data={bookCategoryData} />
          <button onClick={() => navigate('/admin/manage-products')}>View Products</button>
        </div>

        {/* Thẻ biểu đồ Pie cho Manage Users */}
        <div className="dashboard-card">
          <h2>Manage Users</h2>
          <Pie data={userData} />
          <button onClick={() => navigate('/admin/manage-users')}>View Users</button>
        </div>

        {/* Thẻ biểu đồ Line cho View Reports */}
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
