import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"

function Navbar() {
  let navigate = useNavigate();
  let [Count, setCount] = useState(0);
  const [name, setname] = useState(null);
  const [inputs,setinputs]=useState("")

  useEffect(() => {
    // Fetch User Profile
    axios.get("http://localhost:8000/api/Navbar/", {
      withCredentials: true
    })
    .then((res) => {
      setname(res.data);
    })
    .catch((err) => console.log(err));

    // Fetch Notification Count
    axios.get('http://localhost:8000/api/unread-count/', {
      withCredentials: true
    })
    .then((res) => {
      setCount(res.data.count);
    })
    .catch((err) => console.log(err));

      
  }, []);

  function countrest() {
    api.post('mark-read/',{},{
      withCredentials:true
    })
    .then((res)=>{
      setCount(0)
      navigate('/notfication');
    })
    
  }

    function search(e){
      e.preventDefault();
      if (!inputs.trim()) return
       navigate(`/Search/${inputs}`)
    }

  return (
    <nav className="navbar-container">
      <div className="nav-content">
                <div className="nav-left">
          <ul className="nav-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/fq">FQ</Link></li>
            <li><Link to="/User_service">Service</Link></li>
            <li><Link to="/contact">Contact</Link></li>

          </ul>
        </div>

        {/* Center: Search Bar */}
        <div className="nav-center">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <form onSubmit={search}>
               <input onChange={(e)=>setinputs(e.target.value)} onSubmit={search} type="text" placeholder="Search by Inspiration"/>
            </form>
           
          </div>
        </div>

        {/* Right: Actions Group */}
        <div className="nav-right-group">
          
          {/* Notification Icon with Floating Badge */}
          <div onClick={countrest} className="notification-wrapper" title="Notifications">
            <span className="bell-icon">🔔</span>
            {Count > 0 &&(
              <span className="notification-badge">{Count}</span>
            )}
          </div>

          {/* User Profile / Login Div-Button */}
          {name ? (
            <div className="nav-right">
              <div 
                onClick={() => navigate('/profile')} 
                className="user-div-btn"
              >
                👤 Hi {name.username}
              </div>
            </div>
          ) : (
            <div className="nav-right">
              <div 
                onClick={() => navigate('/login')} 
                className="user-div-btn"
              >
                Log in
              </div>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;