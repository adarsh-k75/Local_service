import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
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
    <form onSubmit={onsubmit}>
        <input name="username"  value={inputs.username} onChange={onchnage}/>
        <input name="email"  value={inputs.email} onChange={onchnage}/>
        <button type="submit">EDIT</button>

    </form>
  </>)
    
}
export default Profile_edit