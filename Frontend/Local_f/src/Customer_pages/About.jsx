
import './About.css'
function About(){

    return(

        <div className="about-page-wrapper">
  {/* Hero Section */}
  <section className="about-hero">
    <div className="about-card hero-glass">
      <div className="hero-content">
        <h1>Sophie Moore</h1>
        <p className="subtitle">Web Developer & UI Enthusiast</p>
        <div className="status-badge">Available for Projects</div>
      </div>
    </div>
  </section>

  {/* Main Content Grid */}
  <section className="about-grid">
    {/* Mission Card */}
    <div className="about-card mission-box">
      <h3>The Vision</h3>
      <p>
        Building modern, scalable web applications that bridge the gap between 
        premium design and functional performance. Currently developing a 
        specialized local service marketplace to empower small businesses.
      </p>
    </div>

    {/* Technical Skills Card */}
    <div className="about-card skills-box">
      <h3>Tech Stack</h3>
      <div className="tech-pills">
        <span>React</span>
        <span>Redux</span>
        <span>Django</span>
        <span>CSS Glassmorphism</span>
        <span>Modern UI/UX</span>
      </div>
    </div>

    {/* Experience/Journey Card */}
    <div className="about-card journey-box">
      <h3>My Journey</h3>
      <p>
        From mastering JavaScript variable behaviors to architecting complex 
        state management systems, my focus is on clean code and editorial-style 
        grid layouts.
      </p>
    </div>
  </section>
</div>
    )
}
export default About