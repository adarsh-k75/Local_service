 import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
            nav("/home")
        })
        .catch((err)=>{
            console.log(err.response.data)
            nav("/login")
        })
    }

    return(
        <>
        <form onSubmit={onsubmit}>

            <input
                name="username"
                placeholder="Username"
                onChange={onchange}
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={onchange}
            />

            <button type="submit">Login</button>

        </form>
        </>
    )
}

export default Login