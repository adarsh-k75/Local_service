import './Register.css'
import { useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import Loading from '../Loading/Loading'
import api from '../api/axios'
function Register() {
    let Naviagte=useNavigate()
    const [isloading, setisloading] = useState(false);
   const [Role,setRole]=useState("customer")
    const [inputs,setinputs] = useState({
        username:"",
        email:"",
        password:"",
        confirms:""
    })

    const handlechange = (e)=>{
        setinputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    let [errors,seterror]=useState({})

    const valiadation=()=>{
     let neweror={}
     if(inputs.username.length<3){
       neweror.username="Username must be at least 3 characters"
     }
       const emailpaten=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
     if (!emailpaten.test(inputs.email)){
         neweror.email="Enter a valid email address"
     }

       const passwerpatern=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
      if(!passwerpatern.test(inputs.password)){
        neweror.password="Password must contain letters and numbers (min 6)"
      }

      if(inputs.password!==inputs.confirms){
            neweror.confirms = "Passwords do not match"
      }
      seterror(neweror)
      return Object.keys(neweror).length==0
    }

    const onsubmits = (e)=>{
        e.preventDefault()
        if(!valiadation()){
          return
        }
         setisloading(true);
        api.post('register/',{
            username:inputs.username,
            email:inputs.email,
            password:inputs.password,
            confirms:inputs.confirms,
            role:Role

        })
        .then((res)=>{
            toast.success("Register Successfully");
             Naviagte("/login")
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
        .finally(() => {
        setisloading(false); 
    });
    }

    return(
        <>
        {isloading && <Loading />}
     <div className="login-page-container">

<div className="login-card">

<div className="login-header">
<h2>Create Account</h2>
<p>Join the new level of care for your home</p>
</div>

<form onSubmit={onsubmits} className="login-form">

<input
name="username"
placeholder="Username"
className="login-input"
onChange={handlechange}
/>

{errors.username && (
<p className="input-error">{errors.username}</p>
)}

<input
name="email"
type="email"
placeholder="Email"
className="login-input"
onChange={handlechange}
/>

{errors.email && (
<p className="input-error">{errors.email}</p>
)}

<input
name="password"
type="password"
placeholder="Password"
className="login-input"
onChange={handlechange}
/>

{errors.password && (
<p className="input-error">{errors.password}</p>
)}

<input
name="confirms"
type="password"
placeholder="Re-password"
className="login-input"
onChange={handlechange}
/>

{errors.confirms && (
<p className="input-error">{errors.confirms}</p>
)}

<div className="role-selection">

<button
type="button"
className={`role-btn ${Role==="customer"?"active":""}`}
onClick={()=>setRole("customer")}
>
Customer
</button>

<button
type="button"
className={`role-btn ${Role==="provider"?"active":""}`}
onClick={()=>setRole("provider")}
>
Employee
</button>

</div>

<button type="submit" className="login-btn register-submit">
Register
</button>

</form>

<div className="login-footer">
<p>
Already have an account?
<Link to="/login"> Log In</Link>
</p>
</div>

</div>
</div>
        
        </>
    )
}

export default Register