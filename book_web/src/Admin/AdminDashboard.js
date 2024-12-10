import React, { useEffect, useState } from 'react';
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
  const [genresData, setGenresData] = useState({});
  const [rolesData, setRolesData] = useState({});
  const [totalUsers, setTotalUsers] = useState(0); // Tổng số người dùng
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu sách
    fetch('http://localhost:8000/api/book-statistics/') // Đảm bảo API endpoint đúng
      .then((res) => res.json())
      .then((data) => {
        // Cập nhật Pie chart với dữ liệu thể loại sách
        setGenresData({
          labels: data.books_by_genre.map((genre) => genre.name),
          datasets: [
            {
              label: 'Books by Genre',
              data: data.books_by_genre.map((genre) => genre.book_count),
              backgroundColor: [
                '#FF6384', // Màu sắc cho từng thể loại
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
              ],
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching book statistics:', error);
      });

    // Lấy dữ liệu vai trò người dùng
    fetch('http://localhost:8000/api/user-roles-statistics/') // API endpoint vai trò người dùng
      .then((res) => res.json())
      .then((data) => {
        // Cập nhật dữ liệu vai trò người dùng
        setRolesData({
          labels: Object.keys(data.roles),
          datasets: [
            {
              label: 'Number of Users',
              data: Object.values(data.roles),
              backgroundColor: ['#4CAF50', '#FF9800', '#2196F3'], // Màu sắc cho từng vai trò
            },
          ],
        });
        setTotalUsers(data.total_users); // Lưu tổng số người dùng
      })
      .catch((error) => {
        console.error('Error fetching user roles data:', error);
      });

    // Dữ liệu phản hồi (nếu có logic API phản hồi, có thể giữ nguyên logic)
    setFeedbackData({
      labels: ['Placeholder'], // Nếu không cần phản hồi, có thể để nguyên
      datasets: [
        {
          label: 'Feedback Score',
          data: [0],
          fill: false,
          borderColor: '#79ACD9',
          tension: 0.4,
        },
      ],
    });
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Welcome Back, Admin BookQuest</h1>
      <div className="dashboard-cards">
        {/* Pie chart hiển thị thể loại sách */}
        <div className="dashboard-card">
          <h2>Manage Books</h2>
          {genresData.labels ? <Pie data={genresData} /> : <p>Loading...</p>}
          <button onClick={() => navigate('/admin/manage-products')}>View Products</button>
        </div>

        {/* Bar chart hiển thị vai trò người dùng */}
        <div className="dashboard-card">
          <h2>Manage Users</h2>
          <h3>Total Users: {totalUsers}</h3> {/* Hiển thị tổng số người dùng */}
          {rolesData.labels ? <Bar data={rolesData} /> : <p>Loading...</p>}
          <button onClick={() => navigate('/admin/manage-users')}>View Users</button>
        </div>

        {/* Line chart hiển thị phản hồi */}
        <div className="dashboard-card">
          <h2>View Reports</h2>
          {feedbackData.labels ? <Line data={feedbackData} /> : <p>Loading...</p>}
          <button onClick={() => navigate('/admin/view-reports')}>View Reports</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
