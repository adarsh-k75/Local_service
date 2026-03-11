import './Register.css'
import { useState } from 'react'
import axios from "axios"
function Register() {

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

    const onsubmits = (e)=>{
        e.preventDefault()

        axios.post('http://localhost:8000/api/register/',inputs)
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    }

    return(
        <>
        <form onSubmit={onsubmits}>
            <input name="username" placeholder='Username' onChange={handlechange}/>
            <input name="email" placeholder='Email' onChange={handlechange}/>
            <input name="password" placeholder='Password' onChange={handlechange}/>
            <input name="confirms" placeholder='Re-password' onChange={handlechange}/>
            <button type='submit'>Register</button>
        </form>
        </>
    )
}

export default Register