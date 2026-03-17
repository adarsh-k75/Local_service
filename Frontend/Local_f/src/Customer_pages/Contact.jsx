import './conatct.css'
function Contact(){
return(
<div className="contact-page-wrapper">
  <div className="contact-container">
    {/* Left Side: Info */}
    <div className="contact-info">
      <h1>Let's Connect</h1>
      <p>Have a project in mind or a question about the marketplace? Reach out and let's build something great together.</p>
      
      <div className="info-details">
        <div className="detail-item">
          <span className="icon">📍</span>
          <div>
            <h4>Location</h4>
            <p>Kerala, India</p>
          </div>
        </div>
        <div className="detail-item">
          <span className="icon">✉️</span>
          <div>
            <h4>Email</h4>
            <p>hello@sophiemoore.dev</p>
          </div>
        </div>
      </div>
    </div>

    {/* Right Side: Form */}
    <div className="contact-card">
      <form className="login-form">
        <div className="input-group">
          <input type="text" placeholder="Your Name" className="login-input" required />
        </div>
        <div className="input-group">
          <input type="email" placeholder="Email Address" className="login-input" required />
        </div>
        <div className="input-group">
          <textarea placeholder="How can I help you?" className="login-input contact-textarea" required></textarea>
        </div>
        <button type="submit" className="login-btn">Send Message</button>
      </form>
    </div>
  </div>
</div>
)
}
export default Contact