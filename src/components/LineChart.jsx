import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June',"July","August","September","October","November","December"],
      datasets: [
        {
          label: 'Monthly Bookings',
          data: [65, 59, 80, 81, 56, 55,87,90,120,10,90,68],
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    };

    setChartData(data);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Booking Overview',
      },
    },
  };

  return <Line data={chartData} options={options}  className='styleline'/>;
};

export default LineChart;
