import { useEffect, useState,useRef } from 'react'
import './Notfication.css'
import api from "../api/axios"
import { useNavigate } from 'react-router-dom'
function Notfication(){
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null); // ✅ FIX

  // ✅ INITIAL LOAD (API)
  useEffect(() => {
    api.get("notifications/", {
      withCredentials: true,
    })
    .then((res) => {
      setNotifications(res.data);
      console.log(res.data);
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

  // ✅ LIVE WEBSOCKET
  useEffect(() => {
   let  token=localStorage.getItem("access_token")
    socketRef.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/notifications/?token=${token}`
    );

    socketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.type === "new_message") {
        setNotifications((prev) => {
    
    const exist = prev.find(n => n.sender_id === data.sender_id);

    if (exist) {
      return prev.map(n =>
        n.sender_id === data.sender_id
          ? {
              ...n,
              message: data.message,
              created_at: data.created_at,
              count: (n.count || 1) + 1
            }
          : n
      );
    }

    return [
      {
        id: Date.now(),
        type: "chat",
        message: data.message,
        sender_name: data.sender,
        sender_id: data.sender_id,
        created_at: data.created_at,
        is_read: false,
        count: 1
      },
      ...prev
    ];
  });
      }


       if (data.type === "booking") {
    setNotifications((prev) => [
      {
        id: Date.now(),
        type: "booking",
        message: data.message,
        sender_name: data.sender,
        sender_id: data.sender_id,
        related_booking: data.related_booking,
        created_at: data.created_at,
        is_read: false
      },
      ...prev
    ]);
  }


      if (data.type === "count_update") {
        console.log("New Count:", data.count);
      }
    };

    return () => socketRef.current.close();
  }, []);

  function deatils(n){

                if (n.type === "chat") {
                     api.post(`mark_read_chat/${n.sender_id}`,{},{
                  withCredentials:true
                })
                .catch((err)=>{
                   console.log(err);
                })

                  navigate(`/chat/${n.sender_id}`);
                } else if (n.related_booking) {
                  navigate(`/Booking/${n.related_booking}`);
                }
  }

  return (
    <div className="notifications-container">
      <h2 className="page-header">🔔 Notifications</h2>

      {notifications.length === 0 ? (
        <p className="no-data">No notifications available</p>
      ) : (
        <div className="notifications-grid">
          {notifications.map((n) => (
            <div
              key={`${n.type}-${n.id}`} 
              className={`notification-card fade-in ${
                !n.is_read ? "unread" : ""
              }`}
              onClick={()=>deatils(n)}
            >
               {n.count > 1 && <span className="notif-count-badge">{n.count}</span>}
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
                  {/* ✅ Show sender only for chat */}
                  {n.type === "chat" && <p>{n.sender_name}</p>}
                  {/* ✅ Message */}
                  <p>
                    {n.type === "chat"
                      ? `💬 ${n.message}`
                      : n.message}
                  </p>
                </div>

                {/* ✅ KEEP OLD BOOKING BUTTON */}
                {n.related_booking && n.type !== "chat" && (
                  <button
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent double click
                      navigate(`/Booking/${n.related_booking}`);
                    }}
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