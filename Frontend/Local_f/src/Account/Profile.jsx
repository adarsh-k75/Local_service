import axios from "axios"
import { useState ,useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { useFetcher } from "react-router-dom"
import api from "../api/axios"
import './Profile.css'
function Profile(){
  let Navigater=useNavigate()
  let [profile,setprofile] = useState({})

  useEffect(()=>{
    api.get("profile/",{
        withCredentials:true
    })
    .then((res)=>{
        setprofile(res.data)
    })
  },[])
    function Logout(){
         axios.post('http://localhost:8000/api/logout/',{},{
            withCredentials:true
         })
         .then((res)=>{
            Navigater('/home')
         })
    }

  return(
    <div className="profile-container">
     {profile.role==="customer"&&(
        <div className="profile-card">

            <h2>User Profile</h2>

            <div className="profile-info">
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
            </div>

            <div className="profile-buttons">
                <button onClick={()=>{Navigater('/Re-password')}} className="reset-btn">Reset Password</button>
                <button onClick={()=>{Navigater('/profile_edit')}} className="reset-btn">Edit</button>
                <button onClick={Logout} className="logout-btn">Logout</button>
            </div>

        </div>
     )}

      {profile.role==="provider"&&(

        <div className="profile-card">

            <h2>Employee Profile</h2>

            <div className="profile-info">
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
            </div>

            <div className="profile-buttons">
                <button onClick={()=>{Navigater('/Re-password')}} className="reset-btn">Reset Password</button>
                <button onClick={()=>{Navigater('/profile_edit')}} className="reset-btn">Edit</button>
                <button onClick={Logout} className="logout-btn">Logout</button>
                <button onClick={Logout} className="logout-btn">Add Skill</button>

            </div>

        </div>
     )}
       

    </div>
  )
}

export default Profile