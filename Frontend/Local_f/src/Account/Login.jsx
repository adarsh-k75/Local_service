 import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Login.css'
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
function Login(){

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

        axios.post('http://localhost:8000/api/login/',inputs,{
            withCredentials:true
        })
        .then((res)=>{
            console.log(res.data)
            nav("/")
        })
        .catch((err)=>{
            toast.error(err.response.data.error);
            nav("/login")
        })
    }

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

          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
        </div>
      </div>
    </div>
        </>
    )
}

export default Login