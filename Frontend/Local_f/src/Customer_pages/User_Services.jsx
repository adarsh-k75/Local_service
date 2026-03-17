import { useEffectEvent } from "react"
import { useEffect, useState } from "react"
import api from "../api/axios"
import axios from "axios"
import './User_services.css'
function  User_services(){
 let [Catagery,setCatgery]=useState([])
 let [Subservices,setServices]=useState([])
 let [Provider,setprovider]=useState([])
 let [id_catgory,setid_catgrory]=useState(null)
 let [id_provider,idsetprovider]=useState(null)

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
            console.log(res.data)
            setprovider(res.data)
        })
     }
   return(<>
       <div className="marketplace-container">
  {/* Step 1: Main Categories */}
  <div className="section-block">
    <h2 className="marketplace-title">Select a Category</h2>
    <div className="pill-grid">
      {Catagery.map((data) => (
        <div 
          key={data.id}
          className={`market-card category-card ${id_catgory === data.id ? 'selected' : ''}`}
          onClick={() => catagory_click(data.id)}
        >
          <span className="card-icon">✨</span>
          <h3>{data.name}</h3>
        </div>
      ))}
    </div>
  </div>

  {/* Step 2: Sub-Services */}
  {id_catgory && (
    <div className="section-block fade-in">
      <h2 className="marketplace-title">What service do you need?</h2>
      <div className="pill-grid">
        {Subservices.map((data) => (
          <div 
            key={data.id}
            className={`market-card sub-service-card ${id_provider === data.id ? 'selected-sub' : ''}`}
            onClick={() => provider(data.id)}
          >
            <h3>{data.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Step 3: Provider Results */}
  {id_provider && (
    <div className="section-block fade-in">
      <h2 className="marketplace-title">Available Professionals</h2>
      <div className="provider-results-grid">
        {Provider.map((data) => (
          <div className="provider-glass-card" key={data.id}>
            <div className="provider-img-box">
              <img src={data.work_image.urls || data.work_image} alt="work" />
              <div className="price-badge">₹{data.price}</div>
            </div>
            <div className="provider-content">
              <div className="provider-header">
                <h2>{data.provider.username}</h2>
                <span className="exp-tag">{data.experience} Yrs Exp</span>
              </div>
              <h3>{data.service.name}</h3>
              <p>{data.description}</p>
              <button className="book-btn">Book Service</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
   </>)
}

export default User_services