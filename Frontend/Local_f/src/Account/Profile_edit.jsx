import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import './Profile_edit.css'
function Profile_edit() {
let Navigater=useNavigate()
let [inputs,setinputs]=useState({
    username:"",
    email:""
})
  useEffect(()=>{
     axios.get('http://localhost:8000/api/profile/',{
        withCredentials:true
     })
     .then((res)=>{
        setinputs(res.data)
     })
  },[])

 const onchnage=(e)=>{
    setinputs({...inputs,[e.target.name]:e.target.value})
 }
 const onsubmit=(e)=>{
    e.preventDefault()
      axios.patch('http://localhost:8000/api/profile/',inputs,{
        withCredentials:true
      })
      .then((res)=>{
       Navigater("/profile")
      })
 }
  return(<>
   <div className="login-page-container">
  <div className="login-card edit-profile-card">
    <div className="login-header">
      <div className="edit-icon-circle">
        <span>✏️</span>
      </div>
      <h2>Edit Profile</h2>
      <p>Update your personal information below</p>
    </div>

    <form onSubmit={onsubmit} className="login-form">
      <div className="input-group">
        <label className="input-label">Username</label>
        <input 
          name="username" 
          value={inputs.username} 
          onChange={onchnage} 
          className="login-input"
          placeholder="Enter new username"
        />
      </div>

      <div className="input-group">
        <label className="input-label">Email Address</label>
        <input 
          name="email" 
          value={inputs.email} 
          onChange={onchnage} 
          className="login-input"
          placeholder="Enter new email"
        />
      </div>

      <button type="submit" className="login-btn save-btn">
        Save Changes
      </button>
      
      <button 
        type="button" 
        className="cancel-btn" 
        onClick={() => window.history.back()}
      >
        Cancel
      </button>
    </form>
  </div>
</div>
  </>)
    
}
export default Profile_edit