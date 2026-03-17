import './Specilal_nav.css'
import { useEffect,useState } from 'react';
const Specilal_nav = () => {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    // 3-second delay before the navbar enters
    const timer = setTimeout(() => {
      setShowNav(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showNav && (
        <nav className="floating-navbar">
          <div className="nav-pill">
            
            <div className="nav-train-container">
              <div className="nav-train-track">
                <div className="nav-item">Nominees</div>
                <div className="nav-item">Courses</div>
                <div className="nav-item">Collections</div>
                <div className="nav-item">Directory</div>
                <div className="nav-item">Market</div>
                <div className="nav-item">Services</div>
                <div className="nav-item">Pricing</div>
                <div className="nav-item">Contact</div>
                
                <div className="nav-item">Nominees</div>
                <div className="nav-item">Courses</div>
                <div className="nav-item">Collections</div>
                <div className="nav-item">Directory</div>
              </div>
            </div>

            <button className="nav-button">Visit Now</button>
          </div>
        </nav>
      )}
    </>
  );
};

export default Specilal_nav;