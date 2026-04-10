import axios from "axios"
import { useState ,useEffect} from "react"
import { data, useNavigate } from "react-router-dom"
import { useFetcher } from "react-router-dom"
import api from "../api/axios"
import { toast } from "react-toastify";

import './Profile.css'
function Profile(){
  let Navigater = useNavigate();

  let [profile, setprofile] = useState({});
  let [services, setservices] = useState([]);
  let [bookinview, setbookingview] = useState([]);
  const [addres,setaddres]=useState({})
  const [loading, setLoading] = useState(true);
  const [inputs,setinputs]=useState({
         address: "",
         pincode: "",
         phone:""
  })
  const [images,setimage]=useState(null)
  useEffect(() => {
    Promise.all([
      api.get("profile/", { withCredentials: true }),
      api.get("ProviderServices/", { withCredentials: true }),
      api.get("Bookin_view/", { withCredentials: true }),
      api.get("UserProfile/", { withCredentials: true }),

    ])
      .then(([profileRes, serviceRes, bookingRes,addressres]) => {

        setprofile(profileRes.data);
        setservices(serviceRes.data);
        setbookingview(bookingRes.data);
        setaddres(addressres.data)

        
      })
      .catch((err) => {
        console.error("ERROR:", err);
      })
      .finally(() => {
        setLoading(false); 
      });
       api.get("UserProfile/",{withCredentials:true})
       .then((res)=>{
        setaddres(res.data)
       })
  }, []);

  function Logout() {
    axios.post("http://localhost:8000/api/logout/", {}, {
      withCredentials: true
    })
    .then(() => {
      Navigater('/');
      window.location.reload();
    });
  }
  function onchangeinput(e){
      setinputs({...inputs,[e.target.name]:e.target.value})
  }
    
  function ProfileSubmit(e){
      e.preventDefault();
  navigator.geolocation.getCurrentPosition((position)=>{
       
      let newdata=new FormData()
     newdata.append("address",inputs.address)
     newdata.append("pincode",inputs.pincode)
     newdata.append("phone",inputs.phone)
     newdata.append("id_card",images)
     newdata.append("id_card",images)
     newdata.append("latitude", position.coords.latitude);
     newdata.append("longitude", position.coords.longitude);

     api.post("UserProfile/",newdata,{
      withCredentials:true
     })
     .then((res)=>{
      toast.success("Profile Set Sucessfuly")
      window.location.reload();
     })

  })
  

  }
   

  return (
   <div className="profile-page-wrapper">
  <div className="profile-container">

    {/* ================= CUSTOMER ================= */}
    {profile.role === "customer" && (
      <div className="profile-main-layout">
        {/* Left: Fixed Profile Card */}
        <aside className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">{profile.username?.charAt(0)}</div>
              <h2>User Profile</h2>
            </div>

            <div className="profile-info">
              <div className="info-item">
                <span className="label">Username</span>
                <span className="value">{profile.username}</span>
              </div>
              <div className="info-item">
                <span className="label">Email</span>
                <span className="value">{profile.email}</span>
              </div>
              {addres?(
                  <div className="address-display-box">
                      <div className="info-item">
                        <span className="label">Phone</span>
                        <span className="value">{addres.profile.phone}</span>
                      </div>
                      
                      <div className="info-item">
                        <span className="label">Address</span>
                        <span className="value">{addres.profile.address}</span>
                      </div>
                    
                      <div className="info-item">
                        <span className="label">Pincode</span>
                        <span className="value">{addres.profile.pincode}</span>
                      </div>
                       <button onClick={()=>Navigater('/addres_edit')} className="save-btn">Update Details</button>
                   </div>         

              ):(

              <form className="profile-update-form" onSubmit={ProfileSubmit}>
                <input onChange={onchangeinput} type="text" name="address" placeholder="Address" className="glass-input"/>
                <input onChange={onchangeinput} type="text" name="phone" placeholder="Phone number" className="glass-input"/>
                <input onChange={onchangeinput} type="text" name="pincode" placeholder="Pincode" className="glass-input"/>
                <button type="submit" className="save-btn">Update Details</button>
              </form>
              )}
              
            </div>

            <div className="profile-buttons">
              <button onClick={() => Navigater('/Re-password')} className="action-btn outline">Reset Password</button>
              <button onClick={() => Navigater('/profile_edit')} className="action-btn outline">Edit Profile</button>
              <button onClick={Logout} className="action-btn logout-btn">Logout</button>
            </div>
          </div>
        </aside>

        <main className="profile-content-feed">
          <h2 className="feed-title">My Recent Bookings</h2>
          <div className="notifications-container">
            {loading ? (
              <div className="loading-state">Gathering your history...</div>
            ) : bookinview.length === 0 ? (
              <div className="empty-state">No active bookings found.</div>
            ) : (
              <div className="notifications-grid">
                {bookinview.map((b) => (
                  <div key={b.id} className="notification-card fade-in">
                    <div className="notif-header">
                      <div className="time-info-grid">
                         <div className="time-box">
                            <span className="notif-label">Date</span>
                            <p className="notif-value">{b.booking_date}</p>
                         </div>
                         <div className="time-box">
                            <span className="notif-label">Time</span>
                            <p className="notif-value">{b.booking_time}</p>
                         </div>
                      </div>
                      <span className={`status-badge ${b.status}`}>{b.status}</span>
                    </div>

                    <div className="card-body">
                      <p className="status-helper-text">
                        {b.status === "pending" && "Your request is being reviewed."}
                        {b.status === "accepted" && "Provider is scheduled."}
                        {b.status === "completed" && "Job finished successfully."}
                      </p>
                      <button className="details-link-btn" onClick={() => Navigater(`/Booking/${b.id}`)}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    )}

    {/* ================= PROVIDER ================= */}
    {profile.role === "provider" && (
      <div className="profile-main-layout">
         <aside className="profile-sidebar">
            <div className="profile-card provider-variant">
              <div className="profile-header">
                <div className="profile-avatar employee-avatar">E</div>
                <h2>Employee Panel</h2>
              </div>

              <div className="profile-info">
                <div className="info-item">
                  <span className="label">Username</span>
                  <span className="value">{profile.username}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email</span>
                  <span className="value">{profile.email}</span>
                </div>
                {addres?.profile?.address ?(
                  <div className="address-display-box">
                      <div className="info-item">
                        <span className="label">Phone</span>
                        <span className="value">{addres.profile.phone}</span>
                      </div>
                      
                      <div className="info-item">
                        <span className="label">Address</span>
                        <span className="value">{addres.profile.address}</span>
                      </div>
                    
                      <div className="info-item">
                        <span className="label">Pincode</span>
                        <span className="value">{addres.profile.pincode}</span>
                      </div>
                       <button onClick={()=>Navigater('/addres_edit')} className="save-btn">Update Details</button>
                   </div>         

              ):(


                <form className="profile-update-form" onSubmit={ProfileSubmit}>
                   <input onChange={onchangeinput} type="text" name="address" placeholder="Service Address" className="glass-input"/>
                    <input onChange={onchangeinput} type="text" name="phone" placeholder="Contact" className="glass-input"/>
                   <input onChange={onchangeinput} type="text" name="pincode" placeholder="Pincode" className="glass-input"/>
                   <div className="file-upload-wrapper">
                      <label className="file-label">ID Verification</label>
                      <input onChange={(e)=>setimage(e.target.files[0])} type="file" className="glass-file-input"/>
                   </div>
                   <button type="submit" className="save-btn">Verify & Save</button>
                </form>
              )}

              </div>

              <div className="profile-buttons employee-grid">
                <button onClick={() => Navigater('/Re-password')} className="action-btn outline">Reset</button>
                <button onClick={() => Navigater('/profile_edit')} className="action-btn outline">Edit</button>
                <button onClick={() => Navigater('/Services')} className="action-btn skill-btn">Add Skill</button>
                <button onClick={Logout} className="action-btn logout-btn">Logout</button>
              </div>
            </div>
         </aside>

         <main className="profile-content-feed">
            <h2 className="feed-title">My Services & Active Skills</h2>
            <div className="skills-grid">
              {services.map((data, index) => (
                <div className="skill-item-card fade-in" key={index}>
                  <div className="skill-img-box">
                    <img src={data.work_image_url} alt="work" />
                  </div>
                  <div className="skill-text-box">
                    <h3>{data.service_name.name}</h3>
                    <p className="exp-text">{data.experience} Yrs Experience</p>
                    <p className="desc-text">{data.description}</p>
                    <div className="card-footer-meta">
                       <span className="date-badge">{new Date(data.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
         </main>
      </div>
    )}
  </div>
</div>
  );
}

export default Profile