import './conatct.css'
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { useState } from 'react';
import api from '../api/axios';
import { toast } from "react-toastify";

function Contact(){
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    api.post("contact/", form)
      .then((res) => {
        toast.success(res.data.success);
        setForm({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="contact-page-wrapper">
      <div className="contact-container">

        {/* Left Side */}
        <div className="contact-info">
          <h1>Let's Connect</h1>
          <p>Reach out and let's build something great together.</p>

          <div className="info-details">
            <div className="detail-item">
              <span className="icon"><HiOutlineLocationMarker size={24} /></span>
              <div>
                <h4>Location</h4>
                <p>Kerala, India</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="icon"><HiOutlineMail size={24} /></span>
              <div>
                <h4>Email</h4>
                <p>hello@sophiemoore.dev</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="contact-card">
          <form className="login-form" onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="login-input"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="login-input"
              value={form.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="How can I help you?"
              className="login-input contact-textarea"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading} className="login-btn">
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
export default Contact