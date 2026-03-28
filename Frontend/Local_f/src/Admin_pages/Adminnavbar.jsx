import './Adminnavbar.css'
import { Link } from "react-router-dom"
import './Adminnavbar.css'
function Adminnavbar(){
return(<>
   <nav className="floating-navbar">
          <div className="nav-pill">
            
            <div className="nav-train-container">
              <div className="nav-train-track">
                <div className="nav-item">Dashboard</div>
                <div className="nav-item">Users</div>
                <div className="nav-item">Providers</div>
                <div className="nav-item">verfication</div>
              </div>
            </div>

            <button className="nav-button">Logout</button>
          </div>
        </nav>
</>)
}
export default Adminnavbar