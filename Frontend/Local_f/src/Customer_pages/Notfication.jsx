import { useEffect, useState } from 'react'
import './Notfication.css'
import api from "../api/axios"
import { useNavigate } from 'react-router-dom'
function Notfication(){
 const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api.get("notifications/", {
      withCredentials: true,
    })
    .then((res) => {
      setNotifications(res.data);
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err);
    });

    api.post("mark-read/", {}, {
      withCredentials: true,
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);

  return (
    <div className="notifications-container">
      <h2 className="page-header">🔔 Notifications</h2>

      {notifications.length === 0 ? (
        <p className="no-data">No notifications available</p>
      ) : (
        <div className="notifications-grid">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`notification-card fade-in ${
                !n.is_read ? "unread" : ""
              }`}
            >
              {/* Header */}
              <div className="card-header">
                <div className="time-info">
                  <span className="notif-label">Date</span>
                  <p className="notif-value">
                    {new Date(n.created_at).toLocaleDateString()}
                  </p>
                </div>

                {!n.is_read && (
                  <span className="status-badge pending">
                    New
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="card-body">
                <div className="status-text">
                  <p>{n.sender_name}</p>
                  <p>{n.message}</p>
                </div>

                {/* If related booking exists */}
                {n.related_booking && (
                  <button
                    className="action-btn"
                    onClick={() => navigate(`/Booking/${n.related_booking}`)}
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Notfication