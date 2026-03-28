import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api/axios"
import './Search.css'
function Search(){
let {query}=useParams()
const [result,setresult]=useState([])

useEffect(()=>{
api.get(`search/?q=${query}`)
.then((res)=>{
    setresult(res.data)
    console.log(res.data)
})

},[query])

return(<>
 {result.length > 0 ?(<>
    {result.map((data)=>(

    <div className="svc-grid-container">
  <div className="svc-card fade-in">
    <div className="svc-image-section">
      <img src={data.work_image} alt="service" className="svc-img" />
      <span className="svc-exp-tag">{data.experience} Yrs</span>
    </div>

    <div className="svc-details">
      <h2 className="svc-name">{data.provider_name}</h2>
      <p className="svc-type">{data.service.name}</p>
      
      <div className="svc-divider"></div>

      <div className="svc-footer">
        <div className="svc-price-block">
          <span className="svc-price-label">FROM</span>
          <span className="svc-price-amt">₹{data.price}</span>
        </div>
        <button className="svc-view-btn">View</button>
      </div>
    </div>
  </div>
</div>
    ))}
 </>):(
     <h3>not data found</h3>
 )}

</>)

}
export default Search