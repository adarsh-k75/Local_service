import { useEffect,useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"
import './User_list.css'
import Adminnavbar from "./Adminnavbar"
function User_list(){
  let navigater=useNavigate()
    let [User,setuser]=useState([])
    useEffect(()=>{
          api.get("User_only/")
          .then((res)=>{
            setuser(res.data)
            console.log(res.data)
          })
    },[])
  function block(id){
      api.patch(`Block_user/${id}/`)
      .then((res)=>{
           alert("block susess fully")
      })
  }


    return(<>
     <div className="admin-page-container">
  {/* Left Side Navigation */}

  {/* Right Side Content Viewport */}
  <main className="admin-main-content">
    <div className="user-management-page fade-in">
      <h1 className="page-main-title">User Management</h1>
      
      <div className="user-cards-grid">
        {User.map((data) => (
          <div key={data.user} className="user-info-card">
            
            <div className="user-card-header">
              <div className="user-avatar-placeholder">
                {data.username.charAt(0).toUpperCase()}
              </div>
              <div className="user-meta">
                <h2 className="user-name">{data.username}</h2>
                <p className="user-email">{data.email}</p>
              </div>
            </div>

            <div className="user-details-body">
              <div className="detail-item">
                <span className="detail-label">Phone</span>
                <p className="detail-value">{data.phone}</p>
              </div>
              <div className="detail-item">
                <span className="detail-label">Address</span>
                <p className="detail-value">{data.address}</p>
              </div>
              <div className="detail-item">
                <span className="detail-label">Pincode</span>
                <p className="detail-value">{data.pincode}</p>
              </div>
            </div>

            <div className="user-card-actions">
              <button 
                className={`action-btn block-btn ${data.is_active ? 'active-user' : 'blocked-user'}`} 
                onClick={() => block(data.user)}
              >
                {data.is_active ? "🚫 Block User" : "✅ Activate"}
              </button>
              
              <button 
                className="action-btn view-btn" 
                onClick={() => navigater(`/booking_view/${data.user}`)}
              >
                📂 View Requests
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
</div>
    </>)

}

export default User_list