import { useEffectEvent } from "react"
import { useEffect, useState } from "react"
import api from "../api/axios"
import axios from "axios"
import './User_services.css'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
function  User_services(){
  let [Catagery,setCatgery]=useState([])
 let [Subservices,setServices]=useState([])
 let [Provider,setprovider]=useState([])
 let [id_catgory,setid_catgrory]=useState(null)
 let [id_provider,idsetprovider]=useState(null)

// ✅ DATE + TIME STATES
 let [selectedDate,setSelectedDate]=useState(null)
 let [hour,setHour]=useState("")
 let [minute,setMinute]=useState("")
 let [ampm,setAmpm]=useState("")

// ✅ CONVERT TIME → 24 FORMAT
 function convertTo24Hour(hour, minute, ampm){
  let h = parseInt(hour)

  if(ampm === "PM" && h !== 12){
    h += 12
  }
  if(ampm === "AM" && h === 12){
    h = 0
  }

  return `${String(h).padStart(2,"0")}:${minute}`
}

// ✅ BOOKING
 function Bookings(id){

  if(!selectedDate || !hour || !minute || !ampm){
    alert("Select date & time")
    return
  }

  const formattedDate = selectedDate.toISOString().split("T")[0]
  const formattedTime = convertTo24Hour(hour, minute, ampm)

  api.post("booking/",{
    provider:id,
    booking_date:formattedDate,
    booking_time:formattedTime
  },{withCredentials:true})
  .then((res)=>{
    alert("Booking Successful")
  })
  .catch((err)=>{
    alert(err.response?.data?.error || "Error")
  })
 }

 useEffect(()=>{
   api.get('service_catgory/')
   .then((res)=>{
      setCatgery(res.data)
   })
 },[])

 function catagory_click(C){
   setid_catgrory(C)
   idsetprovider(null)
   api.get(`subcatgoy/${C}/`)
   .then((res)=>{
      setServices(res.data)
   })
 }

 function provider(P){
  idsetprovider(P)
  api.get(`user_provider_view/${P}/`)
  .then((res)=>{
    setprovider(res.data)
    console.log(res.data)
  })
 }

 return(
 <div className="marketplace-container">

  {/* Category */}
  <div className="section-block">
    <h2 className="marketplace-title">Select a Category</h2>
    <div className="pill-grid">
      {Catagery.map((data)=>(
        <div 
          key={data.id}
          className={`market-card ${id_catgory === data.id ? 'selected' : ''}`}
          onClick={()=>catagory_click(data.id)}
        >
          <h3>{data.name}</h3>
        </div>
      ))}
    </div>
  </div>

  {/* Subservices */}
  {id_catgory && (
    <div className="section-block fade-in">
      <h2 className="marketplace-title">Select Service</h2>
      <div className="pill-grid">
        {Subservices.map((data)=>(
          <div 
            key={data.id}
            className={`market-card ${id_provider === data.id ? 'selected-sub' : ''}`}
            onClick={()=>provider(data.id)}
          >
            <h3>{data.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Providers */}
  {id_provider && (
    <div className="section-block fade-in">
      <h2 className="marketplace-title">Available Professionals</h2>

      <div className="provider-results-grid">
        {Provider.map((data)=>(
          <div className="provider-glass-card" key={data.id}>

            <div className="provider-img-box">
              <img src={data.work_image_url} alt="work"/>
              <div className="price-badge">₹{data.price}</div>
            </div>

            <div className="provider-content">
              <h2>{data.provider_name}</h2>
              <h3>{data.service.name}</h3>
              <p>{data.experience} Years Experience</p>
              <p>{data.description}</p>

              {/* 🔥 BOOKING UI */}
              <div className="booking-section">

                <label>Select Date</label>

                <DatePicker
                  selected={selectedDate}
                  onChange={(date)=>setSelectedDate(date)}
                  minDate={new Date()}
                  placeholderText="Select Date"
                  className="date-picker-input"
                  dateFormat="dd/MM/yyyy"
                />

                <label>Select Time</label>

                <div className="time-picker">

                  {/* Hour */}
                  <select onChange={(e)=>setHour(e.target.value)}>
                    <option value="">Hour</option>
                    {[...Array(12)].map((_,i)=>(
                      <option key={i+1} value={i+1}>{i+1}</option>
                    ))}
                  </select>

                  {/* Minute */}
                  <select onChange={(e)=>setMinute(e.target.value)}>
                    <option value="">Min</option>
                    {[...Array(60)].map((_,i)=>(
                      <option key={i} value={String(i).padStart(2,"0")}>
                        {String(i).padStart(2,"0")}
                      </option>
                    ))}
                  </select>

                  {/* AM PM */}
                  <select onChange={(e)=>setAmpm(e.target.value)}>
                    <option value="">AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>

                </div>

                <button 
                  onClick={()=>Bookings(data.id)} 
                  className="book-btn"
                >
                  Book Service
                </button>

              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  )}

 </div>
 )
}

export default User_services