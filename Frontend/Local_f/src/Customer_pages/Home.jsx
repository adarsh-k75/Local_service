import './Home.css'
function Home(){
  return(<>
  <div className="hero-wrapper">
      <div className="hero-container">
        
        <div className="hero-text-side">
          <h1 className="main-title">
            The New <br />
            Level of Care <br />
            For Your Home
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
            <div className="pill-icon">🛠️</div>
            <div className="pill-text">
              <strong>Pro Tools</strong> <br />
              Expert repair service
            </div>
          </div>

          <div className="floating-pill pill-mid-left">
            <div className="pill-icon">📍</div>
            <div className="pill-text">
              <strong>Local Pros</strong> <br />
              Ready in 30 mins
            </div>
          </div>
        </div>

        <div className="hero-stats-side">
          <div className="stats-card">
            <div className="user-avatars">
              <div className="avatar"></div>
              <div className="avatar"></div>
              <div className="avatar"></div>
            </div>
            <h3>2.7k+</h3>
            <p>Trust us to take care of your home needs</p>
          </div>
        </div>

      </div>
    </div>

  </>)
}

export default Home