import axios from "axios"
import { useState ,useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { useFetcher } from "react-router-dom"
import api from "../api/axios"
import './Profile.css'
function Profile(){
  let Navigater=useNavigate()
  let [profile,setprofile] = useState({})
  let [services,setservices]=useState([])
  useEffect(()=>{
    api.get("profile/",{
        withCredentials:true
    })
    .then((res)=>{
        setprofile(res.data)
    })

    api.get('ProviderServices/',{
      withCredentials:true
    })
    .then((res)=>{
      setservices(res.data)
      console.log(res.data)
    })
      

  },[])
    function Logout(){
         axios.post('http://localhost:8000/api/logout/',{},{
            withCredentials:true
         })
         .then((res)=>{
            Navigater('/')
            window.location.reload()
         })
    }

  return(
  <div className="profile-page-wrapper">
  <div className="profile-container">
    {profile.role === "customer" && (
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">S</div>
          <h2>User Profile</h2>
        </div>

        <div className="profile-info">
          <div className="info-item">
            <span className="label">Username</span>
            <span className="value">{profile.username}</span>
          </div>
          <div className="info-item">
            <span className="label">Email</span>
            <span className="value">{profile.email}</span>
          </div>
        </div>

        <div className="profile-buttons">
          <button onClick={() => { Navigater('/Re-password') }} className="action-btn outline">Reset Password</button>
          <button onClick={() => { Navigater('/profile_edit') }} className="action-btn outline">Edit Profile</button>
          <button onClick={Logout} className="action-btn logout-btn">Logout</button>
        </div>
      </div>
    )}

    {profile.role === "provider" && (
     <div className="provider-dashboard-layout">
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar employee-avatar">E</div>
        <h2>Employee Profile</h2>
      </div>

      <div className="profile-info">
        <div className="info-item">
          <span className="label">Username</span>
          <span className="value">{profile.username}</span>
        </div>
        <div className="info-item">
          <span className="label">Email</span>
          <span className="value">{profile.email}</span>
        </div>
      </div>

      <div className="profile-buttons employee-grid">
        <button onClick={() => Navigater('/Re-password')} className="action-btn outline">Reset Password</button>
        <button onClick={() => Navigater('/profile_edit')} className="action-btn outline">Edit Profile</button>
        <button onClick={() => Navigater('/Services')} className="action-btn skill-btn">Add Skill</button>
        <button onClick={Logout} className="action-btn logout-btn">Logout</button>
      </div>
    </div>

    <div className="skills-section">
      <h2 className="section-title">My Services & Skills</h2>
      <div className="skills-grid">
        {services.map((data, index) => (
          <div className="skill-item-card" key={index}>
            <div className="skill-image-container">
               <img src={data.work_image.urls || data.work_image} alt="work"/>
               <span className="price-tag">₹{data.price}</span>
            </div>
            <div className="skill-details">
              <h3>{data.service.name}</h3>
              <p className="exp-text">{data.experience} Years Experience</p>
              <p className="description">{data.description}</p>
              <span className="date-text">{new Date(data.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
        
    )}
     
  </div>
</div>
  )
}

export default Profile