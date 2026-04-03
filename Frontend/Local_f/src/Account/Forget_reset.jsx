import { useParams,useNavigate, } from "react-router-dom"
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import './Forget_reset.css'
function Forget_reset(){
     const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");

const handleSubmit = () => {

  if (!password || !rPassword) {
    toast.error("All fields are required");
    return;
  }

  if (password !== rPassword) {
    toast.error("Passwords do not match");
    return;
  }

  api.post(`reset-password/${uid}/${token}/`, {
    password: password,
    r_password: rPassword,
  })
  .then((res) => {
    toast.success("Password reset successful");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  })
  .catch((err) => {
    toast.error(
      err.response?.data?.error || "Something went wrong"
    );
  });
};

  return (
  <div className="security-page-container">
  <div className="security-card-panel fade-in-up">
    
    <div className="security-header-section">
      <div className="security-status-icon">🔐</div>
      <h1 className="security-main-title">Security</h1>
      <p className="security-sub-text">Set your new account password</p>
    </div>

    <div className="security-form-body">
      <div className="security-input-group">
        <label className="security-input-label">New Password</label>
        <input
          type="password"
          className="security-custom-input"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="security-input-group">
        <label className="security-input-label">Confirm Password</label>
        <input
          type="password"
          className="security-custom-input"
          placeholder="••••••••"
          onChange={(e) => setRPassword(e.target.value)}
        />
      </div>
      
      <button className="security-submit-btn" onClick={handleSubmit}>
        Update Password
      </button>
    </div>
    
    <div className="security-footer-note">
      <p>Passwords must be at least 8 characters</p>
    </div>

  </div>
</div>
  );
}
export default Forget_reset