import axios from "axios"
import { useState } from "react"
import './rest.css'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
function Reset_password(){
  let Navigate=useNavigate()
  let [inputs,setinputs]=useState({
       password:"",
       r_password:""
  })
    function onchange(e){
      setinputs({...inputs,[e.target.name]:e.target.value})
    }

    function onsubmit(e){
      e.preventDefault()
        axios.post('http://localhost:8000/api/rsetpassword/',inputs,{
            withCredentials:true
        })
        .then((res)=>{
           Navigate('/profile')
        })
    }
    
  return(<>
   <div className="login-page-container">
  <div className="login-card reset-card">
    <div className="login-header">
      <h2>Reset Password</h2>
      <p>Please enter your new password below</p>
    </div>

    <form onSubmit={onsubmit} className="login-form">
      <div className="input-group">
        <input
          type="password"
          name="password"
          placeholder="New Password"
          className="login-input"
          onChange={onchange}
          required
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          name="r_password"
          placeholder="Confirm Password"
          className="login-input"
          onChange={onchange}
          required
        />
      </div>

      <button type="submit" className="login-btn">
        Change Password
      </button>
    </form>

    <div className="login-footer">
      <p>Remember your password? <Link to="/login">Back to Login</Link></p>
    </div>
  </div>
</div>
  </>)
}
export default Reset_password