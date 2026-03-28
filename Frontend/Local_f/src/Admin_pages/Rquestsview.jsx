import { useEffect, useState } from "react"
import api from "../api/axios"
import { useParams } from "react-router-dom"
import "./Rquestsview.css"
import Adminnavbar from "./Adminnavbar"
function Rquestsview(){
 let [booking,setbooking]=useState([])
 let {id}=useParams()
 useEffect(()=>{
    api.get(`Block_user/${id}/`)
    .then((res)=>{
        setbooking(res.data)
        console.log(res.data)
    })

 },[])

return(<>
  <div className="booking-details-page fade-in">
  <h1 className="page-main-title">Booking Confirmation</h1>

  {booking.map((item) => (
    <div key={item.id} className="booking-receipt-card">
      
      {/* Left Column: Visual & Status */}
      <div className="receipt-sidebar">
        <div className="receipt-image-wrapper">
          <img src={item.provider_details.work_image_url} alt="work" />
          <div className={`receipt-status-pill ${item.status}`}>{item.status}</div>
        </div>
        <div className="receipt-id-tag">Booking ID: #{item.id.toString().slice(-6)}</div>
      </div>

      {/* Right Column: Data Details */}
      <div className="receipt-body">
        
        <section className="info-group">
          <h2 className="group-title">Service Summary</h2>
          <div className="info-grid">
            <div className="grid-item">
              <span className="grid-label">Service</span>
              <p className="grid-value">{item.provider_details.service_name.name}</p>
            </div>
            <div className="grid-item">
              <span className="grid-label">Provider</span>
              <p className="grid-value">{item.provider_details.provider_name}</p>
            </div>
          </div>
        </section>

        <section className="info-group">
          <h2 className="group-title">Schedule & Payment</h2>
          <div className="info-grid">
            <div className="grid-item">
              <span className="grid-label">Scheduled Date</span>
              <p className="grid-value">{item.booking_date}</p>
            </div>
            <div className="grid-item">
              <span className="grid-label">Arrival Time</span>
              <p className="grid-value">{item.booking_time}</p>
            </div>
            <div className="grid-item">
              <span className="grid-label">Payment Status</span>
              <p className="grid-value highlight">{item.payment_status}</p>
            </div>
            <div className="grid-item">
              <span className="grid-label">Total Amount</span>
              <p className="grid-value highlight">₹{item.provider_details.price}</p>
            </div>
          </div>
        </section>

        <section className="info-group">
          <h2 className="group-title">Provider Bio</h2>
          <p className="receipt-description">{item.provider_details.description}</p>
        </section>

        <div className="receipt-footer">
           <p>Customer: <strong>{item.user_name}</strong></p>
           <button className="download-receipt-btn">Download PDF</button>
        </div>

      </div>
    </div>
  ))}
</div>
</>)
}

export default Rquestsview
