import { useEffect, useState } from "react"
import api from "../api/axios"
import './Address_edit.css'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

function Address_edit(){
  let naviagter=useNavigate()
 const [inputs, setinputs] = useState({
    phone: "",
    address: "",
    pincode: ""
  });
  let [role,setrole]=useState({})
  const [id_card, setid_card] = useState(null);

  useEffect(() => {
    api.get("UserProfile/", {
      withCredentials: true
    })
    .then((res) => {
      setinputs({
        phone: res.data.profile.phone || "",
        address: res.data.profile.address || "",
        pincode: res.data.profile.pincode || ""
      });
      setrole(res.data.role)
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);

  function handlechange(e) {
    setinputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  }

  function imagechange(e) {
    setid_card(e.target.files[0]);
  }

  function handlesubmit(e) {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition((position) => {

      let formData = new FormData();

      formData.append("address", inputs.address);
      formData.append("pincode", inputs.pincode);
      formData.append("phone", inputs.phone);

      if (id_card) {
        formData.append("id_card", id_card); 
      }

      formData.append("latitude", position.coords.latitude);
      formData.append("longitude", position.coords.longitude);

      api.patch("UserProfile/", formData, {
        withCredentials: true
      })
      .then((res) => {
        toast.success(res.data.message)
        naviagter("/profile")
         window.location.reload();
          
      })
      .catch((err) => {
        toast.error(err.response?.data?.error||"Something went wrong")
      });

    }, 
    
    (error) => {
      toast.error("Please allow location access");
    });
  }

  return (
   <div className="update-profile-wrapper fade-in">
  <div className="update-glass-card">
    <div className="update-header">
      <h2>Update Profile</h2>
      <p>Refine your personal and service details</p>
    </div>

    <form className="update-form-layout" onSubmit={handlesubmit}>
      
      <div className="input-group">
        <label className="input-label">Physical Address</label>
        <input
          type="text"
          name="address"
          placeholder="Enter your full address"
          value={inputs.address}
          onChange={handlechange}
          className="custom-glass-input"
        />
      </div>

      <div className="form-row">
        <div className="input-group">
          <label className="input-label">Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="+91 00000 00000"
            value={inputs.phone}
            onChange={handlechange}
            className="custom-glass-input"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Pincode</label>
          <input
            type="text"
            name="pincode"
            placeholder="600001"
            value={inputs.pincode}
            onChange={handlechange}
            className="custom-glass-input"
          />
        </div>
      </div>

      {role === "provider" && (
        <div className="input-group">
          <label className="input-label">Verification ID / Document</label>
          <div className="file-upload-zone">
            <input
              type="file"
              onChange={imagechange}
              className="hidden-file-input"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="file-upload-trigger">
              <span>Click to upload image</span>
            </label>
          </div>
        </div>
      )}

      <button type="submit" className="update-submit-btn">
        Save Changes
      </button>
    </form>
  </div>
</div>
  );
}
export default Address_edit