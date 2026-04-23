import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState ,useEffect,useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"
import { AuthContext } from "./Authcontext";
 import { useContext } from "react";
 import { HiSearch, HiBell, HiUser } from 'react-icons/hi';
function Navbar() {
  let {user}=useContext(AuthContext)
  let navigate = useNavigate();
  let [Count, setCount] = useState(0);
  const [inputs,setinputs]=useState("")
  let [notificationCount, setNotificationCount] = useState(0);
  let [chatCount, setChatCount] = useState(0);
  useEffect(() => {
    
       
     axios.get("unread-count/", {
      withCredentials: true
    })
    .then((res) => {setNotificationCount(res.data.request_count),
                    setChatCount(res.data.chat_count)
    })
    .catch((err) => console.log(err));


      
  }, []);


  useEffect(() => {
    const token = localStorage.getItem("access_token");

  const socket = new WebSocket(`ws://127.0.0.1:8000/ws/notifications/?token=${token}`);

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);

    if (data.type === "count_update") {
      setChatCount(data.count);
    }
       if (data.type === "booking_count_update") {
  setNotificationCount(data.count);
          
      }

    
  };

  return () => socket.close();
}, []);

    

  function countrest() {
    api.post('mark-read/',{},{
      withCredentials:true
    })
    .then((res)=>{
      setNotificationCount(0)
      navigate('/notfication');
    })
    
  }

    function search(e){
      e.preventDefault();
      if (!inputs.trim()) return
       navigate(`/Search/${inputs}`)
    }

    const count=notificationCount + chatCount;

  return (
 <nav className="navbar-container">
      <div className="nav-content">
        
        {/* Left: Logo + Menu */}
        <div className="nav-left">
          <div className="logo-text">
    <span className="logo-sure">Sure</span>
    <span className="logo-serve">Serve</span>
        </div>
          <ul className="nav-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/fq">FQ</Link></li>
            <li><Link to="/User_service">Service</Link></li>
            <li><Link to="/contact">Support</Link></li>
          </ul>
        </div>

        {/* Center: Search Bar */}
        <div className="nav-center">
          <div className="search-wrapper">
            <HiSearch className="search-icon" size={20} />
            <form onSubmit={search}>
               <input 
                 onChange={(e) => setinputs(e.target.value)} 
                 type="text" 
                 placeholder="Search by Inspiration"
               />
            </form>
          </div>
        </div>

        {/* Right: Actions Group */}
        <div className="nav-right-group">
          {/* Notification Icon */}
          <div onClick={countrest} className="notification-wrapper" title="Notifications">
            <HiBell className="bell-icon" size={24} />
            {user && count > 0 && (
              <span className="notification-badge">{count}</span>
            )}
          </div>

          {/* User Profile / Login */}
          <div className="nav-right">
            <div 
              onClick={() => navigate(user ? '/profile' : '/login')} 
              className="user-div-btn"
            >
              <HiUser size={20} /> {user ? "Hi" : "Log in"}
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;