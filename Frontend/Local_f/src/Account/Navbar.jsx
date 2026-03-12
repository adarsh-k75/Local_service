import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState ,useEffect} from "react";
import axios from "axios";
function Navbar() {

  const [name,setname] = useState(null);
console.log(name)
  useEffect(() => {
    axios.get("http://localhost:8000/api/Navbar/", {
      withCredentials: true
    })
    .then((res) => {
      setname(res.data);
      console.log(res.data)
    })
    .catch((err)=>{
      console.log(err);
    });

  }, []);

  return (
    <nav className="navbar">
      <div className="logo">MySite</div>

      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>

        {name?.username? (
          <li><Link to="profile/">{name.username}</Link></li>
        ) : (
          <li><Link to="/profile">Profile</Link></li>
        )}

      </ul>
    </nav>
  );
}

export default Navbar;