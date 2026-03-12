import axios from "axios"
import { useState } from "react"
import './rest.css'
import { useNavigate } from "react-router-dom"
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
     <div className="reset-container">

        <form onSubmit={onsubmit} className="reset-card">

            <h2>Reset Password</h2>

            <input
            type="password"
            name="password"
            placeholder="New Password"
            onChange={onchange}
            />

            <input
            type="password"
            name="r_password"
            placeholder="Confirm Password"
            onChange={onchange}
            />

            <button type="submit">Change Password</button>

        </form>

    </div>
  </>)
}
export default Reset_password