 import axios from "axios"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import './Login.css'
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import api from "../api/axios"
import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "./Authcontext"
import { useContext } from "react"
import api from "../api/axios"
function Login(){
  let {setUser}=useContext(AuthContext)
let [role,setrole]=useState("")
    const nav = useNavigate()
   

    const [inputs,setinputs] = useState({
        username:"",
        password:""
    })

    function onchange(e){
        setinputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    function onsubmit(e){
        e.preventDefault()

        api.post('login/',inputs,{
            withCredentials:true
        })
        .then((res)=>{
           localStorage.setItem("access_token", res.data.access);

           setUser("login hi",res.data.user)
          if (res.data.role=='admin'){
             nav('/dashboard')
          }else{
           nav("/")
          }
            
        })
        .catch((err)=>{
            toast.error(err.response.data.error);
            nav("/login")
        })
    }

   const  handlesucess=(response)=>{
      const googletoken=response.credential;
      if (!role) {
      toast.error("Please select a role before logging in");
      return;
    }

      api.post('google-login/',{
          token:googletoken,
          role:role
      })
      .then((res)=>{
         if (res.data.role=='admin'){
              nav('/dashboard')
         }else{
           nav("/")
          }
      })
       .catch((err)=>{
            toast.error(err.response.data.error);
            nav("/login")
        })

   }
     const handleError = () => {
    toast.error("Google login failed. Please try again.");
  };

    return(
        <>
     <div className="login-page-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>The new level of care for your home</p>
        </div>

        <form onSubmit={onsubmit} className="login-form">
          <input
            name="username"
            placeholder="Username"
            onChange={onchange}
            className="login-input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={onchange}
            className="login-input"
            required
          />
              
              <div className="role-selection">

<button
type="button"
className={`role-btn ${role==="customer"?"active":""}`}
onClick={()=>setrole("customer")}
>
Customer
</button>

<button
type="button"
className={`role-btn ${role==="provider"?"active":""}`}
onClick={()=>setrole("provider")}
>
Employee
</button>

</div>
           
          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                  <GoogleLogin onSuccess={handlesucess} onError={handleError} />
                  <Link to='/email'>Forgot Password</Link>
                 
        </div>
      </div>
    </div>
        </>
    )
}

export default Login