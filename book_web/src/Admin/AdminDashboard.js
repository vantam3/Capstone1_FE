import React, { useEffect, useState } from 'react';
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
  const [rateData, setRateData] = useState({}); // Dữ liệu số lượng đánh giá
  const [averageRate, setAverageRate] = useState(0); // Trung bình cộng đánh giá

  useEffect(() => {
    // Lấy dữ liệu sách
    fetch('http://localhost:8000/api/book-statistics/') // Đảm bảo API endpoint đúng
      .then((res) => res.json())
      .then((data) => {
        setGenresData({
          labels: data.books_by_genre.map((genre) => genre.name),
          datasets: [
            {
              label: 'Books by Genre',
              data: data.books_by_genre.map((genre) => genre.book_count),
              backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
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
        setRolesData({
          labels: Object.keys(data.roles),
          datasets: [
            {
              label: 'Number of Users',
              data: Object.values(data.roles),
              backgroundColor: ['#4CAF50', '#FF9800', '#2196F3'],
            },
          ],
        });
        setTotalUsers(data.total_users);
      })
      .catch((error) => {
        console.error('Error fetching user roles data:', error);
      });

    // Lấy dữ liệu đánh giá
    fetch('http://localhost:8000/api/rating-statistics/') // API endpoint lấy số liệu đánh giá
      .then((res) => res.json())
      .then((data) => {
        setRateData({
          labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
          datasets: [
            {
              label: 'Number of Ratings',
              data: [data.rates[1], data.rates[2], data.rates[3], data.rates[4], data.rates[5]],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
          ],
        });

        // Tính trung bình cộng
        const totalRates = Object.values(data.rates).reduce((acc, val) => acc + val, 0);
        const weightedSum = Object.entries(data.rates).reduce((acc, [star, count]) => acc + star * count, 0);
        setAverageRate((weightedSum / totalRates).toFixed(2)); // Giữ 2 chữ số thập phân
      })
      .catch((error) => {
        console.error('Error fetching rating statistics:', error);
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
          <h3>Total Users: {totalUsers}</h3>
          {rolesData.labels ? <Bar data={rolesData} /> : <p>Loading...</p>}
          <button onClick={() => navigate('/admin/manage-users')}>View Users</button>
        </div>

        {/* Bar chart hiển thị số lượng đánh giá */}
        <div className="dashboard-card">
          <h2>View Reports</h2>
          <h3>Average Rating: {averageRate}</h3> {/* Hiển thị trung bình cộng */}
          {rateData.labels ? <Bar data={rateData} /> : <p>Loading...</p>}
          <button onClick={() => navigate('/admin/view-reports')}>View Reports</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
