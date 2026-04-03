import './Adminnavbar.css'
import { Link } from "react-router-dom"
import './Adminnavbar.css'
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
function Adminnavbar(){
  let naviagter=useNavigate()
function Logout() {
    api.post("logout/", {}, {
      withCredentials: true
    })
    .then((res) => {
      naviagter("/login");
    });
  }

return(<>
   <nav className="admin-dock-wrapper">
  <div className="admin-dock-container">
    <div className="admin-dock-brand">
      <div className="admin-dock-logo">A</div>
    </div>
    <div className="admin-dock-menu">
      <Link to='/dashboard' className="admin-dock-item">Dashboard</Link>
      <Link to='/All_user' className="admin-dock-item">Users</Link>
      <Link to='/providers' className="admin-dock-item">Providers</Link>
      <Link to='/providers_verifaction' className="admin-dock-item">Verification</Link>
    </div>

    <div className="admin-dock-actions">
      <button onClick={Logout} className="admin-dock-logout">Logout</button>
    </div>
    
  </div>
</nav>
</>)
}
export default Adminnavbar