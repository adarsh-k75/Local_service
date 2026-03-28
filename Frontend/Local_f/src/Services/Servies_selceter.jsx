import { useEffect, useState ,useRef} from "react"
import api from "../api/axios"
import './Service.css'
function Services_selecter(){
const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
   const fileRef = useRef(null);
  const [formData, setFormData] = useState({
    price: "",
    experience: "",
    description: "",
    work_image: null
  });

  useEffect(() => {
    api.get("service_catgory/")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  function handleCategoryClick(category) {

    setSelectedCategory(category.id);
    setSelectedService(null);

    api.get(`subcatgoy/${category.id}/`)
      .then((res) => {
        setSubCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }

  function handleServiceClick(service) {
    setSelectedService(service.id);
  }

  function handleInputChange(e) {
      const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
  }

  

  function handleSubmit(e) {

    e.preventDefault();

  const file = fileRef.current.files[0];


  

  const data = new FormData();
  data.append("service", selectedService);
  data.append("price", formData.price);
  data.append("experience", formData.experience);
  data.append("description", formData.description);
  data.append("work_image", file);

  api.post("ProviderServices/", data, {
    withCredentials: true,
  })
  .then((res) => {
    console.log(res.data);
    alert("Service Added Successfully");
  })
  .catch((err) => {
    console.log("ERROR:", err.response?.data);
  });

  }



return (

<div className="add-service-wrapper">
  <div className="service-card">
    <div className="service-header">
      <h2>List Your Expertise</h2>
      <p>Follow the steps to add a new service to your profile</p>
    </div>

    <div className="selection-section">
      <h3>1. Select Category</h3>
      <div className="category-grid">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className={`select-pill ${selectedCategory === cat.id ? "active" : ""}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>

    {selectedCategory&& (
      <div className="selection-section fade-in">
        <h3>2. Select Specific Service</h3>
        <div className="category-grid">
          {subCategories.map((serv) => (
            <button
              key={serv.id}
              onClick={() => handleServiceClick(serv)}
              className={`select-pill service-pill ${selectedService === serv.id ? "active-service" : ""}`}
            >
              {serv.name}
            </button>
          ))}
        </div>
      </div>
    )}

    {selectedService &&(
      <form onSubmit={handleSubmit} className="login-form service-form fade-in">
        <h3>3. Service Details</h3>
        
        <div className="form-row">
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            className="login-input"
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="experience"
            placeholder="Experience (Years)"
            className="login-input"
            onChange={handleInputChange}
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Describe your service quality..."
          className="login-input service-textarea"
          onChange={handleInputChange}
          required
        />

        <div className="file-upload-wrapper">
          <label>Upload Service Image</label>
          <input
            type="file"
            className="file-input"
            ref={fileRef}
             accept="image/*"
          />
        </div>

        <button type="submit" className="login-btn">
          Add Service to Marketplace
        </button>
      </form>
    )}
  </div>
</div>
  );

}

export default Services_selecter