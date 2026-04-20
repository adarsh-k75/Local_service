import { useEffect, useState } from "react"
import api from "../api/axios"
import "./Provider_verification.css"
function Provider_verification(){
  let [idshow,setidshow]=useState(null)
    let [verifaction,setverifaction]=useState([])
    useEffect(()=>{
     api.get("All_provider/")
     .then((res)=>{
        setverifaction(res.data)
        console.log(res.data)
     })
    },[])

    function verfy(id){
        api.patch(`verfication/${id}/`)
        .then((res)=>{
            alert("verify succesfuly")
        })
    }
return (<>
  <div className="full-page-verification-wrapper">

      {idshow&& (
  <div 
    className="image-modal-overlay" 
    onClick={() => setidshow(null)}
  >
    <div 
      className="image-modal-content" 
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        className="close-modal-btn" 
        onClick={() => setidshow(null)}
      >
        ×
      </button>

      <img 
        src={idshow} 
        alt="Work proof" 
        className="big-image-view"
      />
    </div>
  </div>
)}
  <div className="verification-content-container fade-in">
    <h1 className="page-main-title">Identity Verification</h1>
    <p className="page-subtitle">Review and approve service provider credentials</p>
    
    <div className="verification-grid">
      {verifaction.map((data) => (
        <div key={data.user} className="verify-card">
          
          <div className="id-image-section">
            <img  onClick={()=>setidshow(`http://127.0.0.1:8000${data.id_card}`)}
              src={`http://127.0.0.1:8000${data.id_card}`} 
              alt="Verification ID" 
              className="id-card-display"
            />
            <div className="status-badge">Pending Review</div>
          </div>

          <div className="verify-details">
            <h2 className="user-display-name">{data.username}</h2>
            <div className="verify-divider"></div>
            
            <div className="verify-actions">
              <button 
                className="btn-verify-confirm" 
                onClick={() => verfy(data.user)}
              >
                Confirm Identity
              </button>
            </div>
          </div>

        </div>
      ))}
    </div>
  </div>
</div>

</>)
}

export default Provider_verification