
import api from "../api/axios";
import { toast } from "react-toastify";
import { useState } from "react";
import './Email.css'
function Email(){

 const [email, setEmail] = useState("");
    function send_email(){
        api.post('forgot-password/',{
            email: email
        })
        .then((res)=>{
             toast.success(res.data.message)
             setEmail("")
        })
        .catch((err)=>{
            toast.error(err.response?.data?.error)
        })
    }

  return (
   <div className="verify-page-container">
  <div className="verify-card-panel fade-in-up">
    
    <div className="verify-header-section">
      <div className="verify-status-icon">📩</div>
      <h1 className="verify-main-title">Identity Verification</h1>
      <p className="verify-sub-text">Please enter your email to continue</p>
    </div>

    <div className="verify-form-body">
      <div className="verify-input-group">
        <label className="verify-input-label">Email Address</label>
        <input
          type="email"
          className="verify-custom-input"
          placeholder="e.g. user@domain.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      <button className="verify-submit-btn" onClick={send_email}>
        Send Verification Link
      </button>
    </div>
    
    <div className="verify-footer-note">
      <p>🛡️ End-to-end encrypted verification</p>
    </div>

  </div>
</div>
  );
}
export default Email