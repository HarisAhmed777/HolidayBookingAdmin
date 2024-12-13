import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
} from '@coreui/react-chartjs';

const UICharts = () => {
  const [counts, setCounts] = useState({
    bookingsCount: 0,
    usersCount: 0,
    packageRequestsCount: 0,
    totalAmount: 0,
  });
  const [monthlyStats, setMonthlyStats] = useState(Array(12).fill({ totalBookings: 0, totalRevenue: 0 }));

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/countsofall`);
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching counts", error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const getMonthlyStats = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/monthly-stats`);
        const data = Array(12).fill({ totalBookings: 0, totalRevenue: 0 });

        // Organize data by month index
        response.data.forEach((stat) => {
          data[stat._id - 1] = {
            totalBookings: stat.totalBookings,
            totalRevenue: stat.totalRevenue,
          };
        });
        
        setMonthlyStats(data);
      } catch (error) {
        console.error("Error fetching monthly stats", error);
      }
    };

    getMonthlyStats();
  }, []);

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <CRow className='ms-3 me-3'>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Bookings per Month - Bar Chart</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: monthLabels,
                datasets: [
                  {
                    label: 'Total Bookings',
                    backgroundColor: '#f87979',
                    data: monthlyStats.map(stat => stat.totalBookings),
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Revenue per Month - Line Chart</CCardHeader>
          <CCardBody>
            <CChartLine
              data={{
                labels: monthLabels,
                datasets: [
                  {
                    label: 'Total Revenue',
                    backgroundColor: 'rgba(220, 220, 220, 0.2)',
                    borderColor: 'rgba(220, 220, 220, 1)',
                    pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                    pointBorderColor: '#fff',
                    data: monthlyStats.map(stat => stat.totalRevenue),
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Users vs Package Requests - Doughnut Chart</CCardHeader>
          <CCardBody>
            <CChartDoughnut
              data={{
                labels: ['Users', 'Package Requests'],
                datasets: [
                  {
                    backgroundColor: ['#41B883', '#E46651'],
                    data: [counts.usersCount, counts.packageRequestsCount],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Bookings & Requests - Pie Chart</CCardHeader>
          <CCardBody>
            <CChartPie
              data={{
                labels: ['Bookings', 'Package Requests'],
                datasets: [
                  {
                    data: [counts.bookingsCount, counts.packageRequestsCount],
                    backgroundColor: ['#FF6384', '#36A2EB'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default UICharts;
