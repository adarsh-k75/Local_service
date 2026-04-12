import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"
 import { AuthContext } from "./Authcontext";
 import { useContext } from "react";
function Navbar() {
  let {user}=useContext(AuthContext)
  let navigate = useNavigate();
  let [Count, setCount] = useState(0);
  const [inputs,setinputs]=useState("")
  let [notificationCount, setNotificationCount] = useState(0);
  let [chatCount, setChatCount] = useState(0);
   
  useEffect(() => {
    
       
     axios.get("http://localhost:8000/api/unread-count/", {
      withCredentials: true
    })
    .then((res) => {setNotificationCount(res.data.request_count),
                    setChatCount(res.data.chat_count)
    })
    .catch((err) => console.log(err));


      
  }, []);


  useEffect(() => {
  const socket = new WebSocket("ws://127.0.0.1:8000/ws/notifications/");

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);

    if (data.type === "count_update") {
      setChatCount(data.count);
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
    console.log("toatal",count)

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
            {user && count > 0 &&(
              <span className="notification-badge">{count}</span>
            )}
          </div>

          {/* User Profile / Login Div-Button */}
          {user?(
            <div className="nav-right">
              <div 
                onClick={() => navigate('/profile')} 
                className="user-div-btn"
              >
                👤 Hi 
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