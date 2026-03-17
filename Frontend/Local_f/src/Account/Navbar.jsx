import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Navbar() {
  let navigate = useNavigate()

  const [name,setname] = useState(null)
  useEffect(() =>{
    axios.get("http://localhost:8000/api/Navbar/",{
      withCredentials:true
    })
    .then((res)=>{
      setname(res.data)
      console.log(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })

  },[])

  return (
    <nav className="navbar-container">
      <div className="nav-content">

        <div className="nav-left">
          <ul className="nav-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/User_service">Service</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="nav-center">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search by Inspiration"/>
          </div>
        </div>

        {name ?(
          <div className="nav-right">
            <button 
              onClick={() => navigate('/profile')} 
              className="login-btn"
            >
              👤Hi {name.username}
            </button>
          </div>
        ) : (
          <div className="nav-right">
            <button 
              onClick={() => navigate('/login')} 
              className="login-btn"
            >
              Log in
            </button>
          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar;