import { useEffect, useState } from "react"
import api from '../api/axios';
import "./Dashboard.css"
import { FaUsers, FaUserTie, FaTools, FaCalendarCheck } from 'react-icons/fa';
import {
Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FaCircle } from 'react-icons/fa';
ChartJS.register(
 CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
function Dashboard(){
  let [count,setcount]=useState({})

  useEffect(()=>{
      api.get("Dashboarc_count/")
      .then((res)=>{
        setcount(res.data)
      })
  },[])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Disabling default legend to use custom react-icons legend
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#000',
        bodyColor: '#333',
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        titleFont: { weight: 'bold', size: 14 },
        bodyFont: { size: 13 },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Removing vertical grid lines
        },
        ticks: {
          color: '#000', // Black text for x-axis
          font: { size: 12 },
        },
      },
      y: {
        min: 0,
        max: 500,
        ticks: {
          color: '#000', // Black text for y-axis
          font: { size: 12 },
          stepSize: 100,
          callback: function(value) {
            return value + 'K'; // Matching 100K formatting
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)', // Subtle black grid lines
          drawBorder: false,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
        point: {
            radius: 0, // Hiding points by default
            hoverRadius: 6, // Showing point on hover
            hoverBorderWidth: 3,
        },
        line: {
            tension: 0.4, // Making lines curvy (smooth)
            borderWidth: 3,
        }
    }
  };

  // Dummy Data for mapping later
  const labels = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Completed Work',
        data: [150, 160, 100, 50, 100, 350, 300, 280, 350, 220, 300],
        borderColor: 'rgb(0, 220, 220)', // Cyan
        backgroundColor: 'transparent',
        pointHoverBackgroundColor: 'rgb(0, 220, 220)',
        pointHoverBorderColor: '#fff',
      },
      {
        label: 'Total Accepted Service',
        data: [80, 70, 150, 350, 390, 300, 260, 420, 420, 400, 480],
        borderColor: 'rgb(140, 90, 250)', // Purple
        backgroundColor: 'transparent',
        pointHoverBackgroundColor: 'rgb(140, 90, 250)',
        pointHoverBorderColor: '#fff',
      },
      {
        label: 'Total Canceled Work',
        data: [320, 330, 250, 150, 160, 210, 180, 50, 150, 180, 80],
        borderColor: 'rgb(250, 220, 0)', // Yellow
        backgroundColor: 'transparent',
        pointHoverBackgroundColor: 'rgb(250, 220, 0)',
        pointHoverBorderColor: '#fff',
      },
    ],
  };
  
return(<>
  <div className="dashboard-wrapper">
      <div className="stats-grid">
        
        {/* Total Users */}
        <div className="stat-card">
          <div className="stat-icon-box">
            <FaUsers size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Users</p>
            <h4 className="stat-number">{count.total_users}</h4>
          </div>
        </div>

        {/* Total Providers */}
        <div className="stat-card">
          <div className="stat-icon-box">
            <FaUserTie size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Providers</p>
            <h4 className="stat-number">{count.toatl_provider}</h4>
          </div>
        </div>

        {/* Total Services */}
        <div className="stat-card">
          <div className="stat-icon-box">
            <FaTools size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Services</p>
            <h4 className="stat-number">{count.toatl_services}</h4>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="stat-card">
          <div className="stat-icon-box">
            <FaCalendarCheck size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Bookings</p>
            <h4 className="stat-number">{count.toatl_booking}</h4>
          </div>
        </div>

      </div>

         <div className="graph-card-wrapper">
      <div className="graph-header">
        <h2 className="graph-title">Service Statistics</h2>
        
        {/* Custom Legend using react-icons */}
        <div className="custom-legend">
          <div className="legend-item cyan">
            <FaCircle size={10} /> <span>Completed Work</span>
          </div>
          <div className="legend-item purple">
            <FaCircle size={10} /> <span>Accepted Service</span>
          </div>
          <div className="legend-item yellow">
            <FaCircle size={10} /> <span>Canceled Work</span>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <Line options={options} data={data} />
      </div>
    </div>


    </div>
</>)
}
export default Dashboard