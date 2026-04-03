import './Home.css'
import  { useState, useEffect } from 'react';
function Home(){
const [count, setCount] = useState(0);

  // Counter Logic: 1 to 2700
  useEffect(() => {
    let start = 0;
    const end = 2700;
    const duration = 2000; 
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-wrapper">
      <div className="hero-container">
        
        <div className="hero-text-side">
          <h1 className="main-title">
            <span className="line-animation line-1">The New</span> <br />
            <span className="line-animation line-2">Level of Care</span> <br />
            <span className="line-animation line-3">For Your Home</span>
          </h1>
          <div className="rating">
            <span className="stars">★★★★★</span>
            <span className="reviews">5.0 (2.7k Reviews)</span>
          </div>
        </div>

        <div className="hero-image-center">
          <img 
            src="https://res.cloudinary.com/dwz6wpvak/image/upload/v1773399541/home_first_mssbd1.png" 
            alt="Service Professional" 
            className="man-image" 
          />
          
          <div className="floating-pill pill-top-right">
            <div className="pill-icon pulse-icon">🛠️</div>
            <div className="pill-text">
              <strong>Pro Tools</strong> <br />
              Expert repair service
            </div>
          </div>

          <div className="floating-pill pill-mid-left">
            <div className="pill-icon pulse-icon">📍</div>
            <div className="pill-text">
              <strong>Local Pros</strong> <br />
              Ready in 30 mins
            </div>
          </div>
        </div>

        <div className="hero-stats-side">
          <div className="stats-card-wrapper">
            <div className="stats-card hero-360-rotation">
              {/* The narrow edge light running around the border */}
              <div className="edge-light-runner"></div>
              
              <div className="user-avatars">
                <div className="avatar"></div>
                <div className="avatar"></div>
                <div className="avatar"></div>
              </div>
              <h3>{count.toLocaleString()}+</h3>
              <p>Trust us to take care of your home needs</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home