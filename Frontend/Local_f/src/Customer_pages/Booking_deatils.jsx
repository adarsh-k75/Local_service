import { useEffect, useState } from 'react'
import './Booking_deatils.css'
import { useParams } from 'react-router-dom'
import api from "../api/axios"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaCommentDots } from 'react-icons/fa'; 
function Booking_deatils(){
  let naigater=useNavigate()
 let [data,setdata]=useState({})
 let [user,setuser]=useState(null)
 let [bill,setbill]=useState({})
 let [inputs,setinputs]=useState({
     amount:"",
     description:""
 })
 
 const { id } = useParams()
 useEffect(()=>{
   api.get(`Bookin_deatils/${id}/`,{
    withCredentials:true
   })
   .then((res)=>{
    setdata(res.data)
    console.log(res.data)
   })
    api.get('profile/',{
      withCredentials:true
    })
    .then((res)=>{
       setuser(res.data)
    })
    api.get(`Biling/${id}/`,{
      withCredentials:true
    })
    .then((res)=>{
      setbill(res.data)
    })
 },[])
   function update(status){
         api.patch(`status_update/${id}/`,{status},{
          withCredentials:true
         })
         .then((res)=>{
           window.location.reload();
         })
   }

   function Addbil(id){
     api.post(`Biling/${id}/`,{
           amount:inputs.amount,
           description:inputs.description
     },{
      withCredentials:true
     })
     .then((res)=>{
      toast.success(res.data.message)
        setinputs({ amount: "", description: "" });
        naigater('/notfication')
     })
   }


   function onchange(e){
      setinputs({...inputs,[e.target.name]:e.target.value})
   }



  const handlePayment = async (id) => {

  const res = await api.post('create-order/', {
    booking_id: id
  });

  const options = {
    key: res.data.key,
    amount: res.data.amount,
    currency: "INR",
    order_id: res.data.order_id,

    handler: async function (response) {
      await api.post('verify-payment/', {
        booking_id: id,
        order_id: response.razorpay_order_id,
        payment_id: response.razorpay_payment_id,
        signature: response.razorpay_signature
      });
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
   function Chates(id){
    naigater(`/chat/${id}`)

   }

const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);



return(<>
   {isVisible && (
      <div className="chat-button-container fade-in-up">

         {user?.role==="customer"?(
           <button 
          className="chat-fab" 
          onClick={() => Chates(data.provider_details?.provider)}
        >
          <FaCommentDots size={28} />
        </button>

         ):(
           <button 
          className="chat-fab" 
          onClick={() => Chates(data.user)}
        >
          <FaCommentDots size={28} />
        </button>

         )}
        


      </div>
    )}
<div className="details-page-wrapper">

   {user?.role==="customer"&&(
  <div className="details-card fade-in">
    <h2 className="details-header">Booking Details</h2>

    <section className="details-section">
      <div className="section-title">
        <span className="icon">👷</span>
        <h3>Provider Info</h3>
      </div>
      <div className="provider-profile">
        <img 
          src={data.provider_details?.work_image_url || "/default-avatar.png"} 
          alt="provider" 
          className="details-img"
        />
        <div className="provider-text">
          <p className="label">Name</p>
          <p className="value">{data.provider_details?.provider_name}</p>
          <p className="label">Description</p>
          <p className="value desc">{data.provider_details?.description}</p>
        </div>
      </div>
    </section>

    <div className="divider"></div>

    <section className="details-section">
      <div className="section-title">
        <span className="icon">📅</span>
        <h3>Schedule & Status</h3>
      </div>
      <div className="grid-info">
        <div className="info-item">
          <p className="label">Date</p>
          <p className="value">{data.booking_date}</p>
        </div>
        <div className="info-item">
          <p className="label">Time</p>
          <p className="value">{data.booking_time}</p>
        </div>
        <div className="info-item">
          <p className="label">Status</p>
          <span className={`status-pill ${data.status}`}>
            {data.status === "pending" && "⏳ Pending"}
            {data.status === "accepted" && "✅ Accepted"}
            {data.status === "completed" && "🎉 Completed"}
          </span>
        </div>
      </div>
    </section>

    <div className="divider"></div>

    <section className="details-section">
      <div className="section-title">
        <span className="icon">💰</span>
        <h3>Payment Details</h3>
      </div>
      <div className="payment-box">
        {bill.amount&& (
          <div className="price-row">
            <p>Bill Amount</p>
            <p className="amount">₹{bill.amount}</p>
          </div>
        )}
        <div className="price-row">
          <p>Payment Status</p>
          <p className={`pay-status ${data.payment_status}`}>
            {data.payment_status}
          </p>
        </div>

        {data.status === "completed" && data.payment_status === "pending" && (
          <button onClick={()=>{handlePayment(data.id)}} className="pay-now-btn">
            Securely Pay Now
          </button>
        )}
      </div>
    </section>
  </div>
   )}
    {user?.role === "provider" && (
  <div className="pv-container fade-in">
    {/* --- Header Section --- */}

    <div className="pv-header-card">
      <div className="pv-client-info">
        <div className="pv-avatar-small">{data.user_name?.charAt(0)}</div>
        <div>
          <h1 className="pv-client-name">{data.user_name}</h1>
          <p className="pv-service-label">Service: <span className="pv-highlight">{data.provider_details?.service.name}</span></p>
        </div>
      </div>
      <div className={`pv-status-banner ${data.status}`}>
        {data.status}
      </div>
    </div>

    {/* --- Schedule Details --- */}
    <section className="pv-details-section">
      <div className="pv-section-title">
        <span className="pv-icon">📅</span>
        <h3>Appointment Logistics</h3>
      </div>
      
      <div className="pv-info-grid">
        <div className="pv-info-card">
          <span className="pv-label">Scheduled Date</span>
          <p className="pv-value">{data.booking_date}</p>
        </div>
        <div className="pv-info-card">
          <span className="pv-label">Time Slot</span>
          <p className="pv-value">{data.booking_time}</p>
        </div>
        <div className="pv-info-card">
          <span className="pv-label">Booking ID</span>
          <p className="pv-value"> #{data.id?.toString().slice(-5)}</p>
        </div>
      </div>
    </section>

    {/* --- Action Controls --- */}
    <div className="pv-action-area">
      {data.status === "pending" && (
        <div className="pv-decision-box">
          <p className="pv-prompt">Accept this request to start the service?</p>
          <div className="pv-button-group">
            <button className="pv-btn pv-btn-accept" onClick={() => update("accepted")}>
              Accept Request
            </button>
            <button className="pv-btn pv-btn-cancel" onClick={() => update("cancelled")}>
              Decline
            </button>
          </div>
        </div>
      )}

      {data.status === "accepted" && (
        <div className="pv-billing-card">
          <div className="pv-section-title">
            <span className="pv-icon">🧾</span>
            <h3>Finalize & Generate Bill</h3>
          </div>
          <form className="pv-bill-form" onSubmit={(e) => { Addbil(data.id); e.preventDefault(); }}>
            <div className="pv-input-group">
              <input 
                name='amount' 
                type="number"
                className="pv-input" 
                placeholder='Total Amount (₹)' 
                onChange={onchange} 
                required
              />
              <input 
                name='description' 
                className="pv-input" 
                placeholder='Work Description' 
                onChange={onchange} 
                required
              />
            </div>
            <button type='submit' className="pv-btn pv-btn-primary">
              Complete Service & Send Bill
            </button>
            
          </form>
        </div>
      )}
    </div>
  </div>

)}
</div>
</>)

}
export default Booking_deatils