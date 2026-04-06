import React, { useEffect, useState } from 'react';
import {
  Bar,
  Pie
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function UsageAnalytics() {
  const [data, setData] = useState({
    users: 0,
    resources: 0,
    programs: 0
  });

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/analytics`)
      .then(res => res.json())
      .then(setData);
  }, []);

  const chartData = {
    labels: ['Users', 'Resources', 'Programs'],
    datasets: [
      {
        label: 'Count',
        data: [data.users, data.resources, data.programs],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ]
      }
    ]
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Analytics Dashboard</h2>

      <div style={{ width: '500px', marginBottom: '40px' }}>
        <h3>Bar Chart</h3>
        <Bar data={chartData} />
      </div>

      <div style={{ width: '400px' }}>
        <h3>Pie Chart</h3>
        <Pie data={chartData} />
      </div>
    </div>
  );
}