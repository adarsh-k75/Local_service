import './Specilal_nav.css'
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom'
import api from "../api/axios"

const Specilal_nav = () => {
    const [showNav, setShowNav] = useState(false);
  const [services, setservices] = useState([]);
  const navigate = useNavigate();

  // ✅ Fisher-Yates Shuffle
  const shuffleArray = (array) => {
    let newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  };

  // ⏱ Show navbar after 3 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNav(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // 📡 Fetch services + shuffle
  useEffect(() => {
    api.get("Subservice/")
      .then((res) => {
        // 🔥 shuffle + limit (optional)
        const shuffled = shuffleArray(res.data).slice(0, 10);
        setservices(shuffled);
      })
      .catch((err) => {
        console.log("Error fetching services", err);
      });
  }, []);

  // 🚀 Navigate handler
  const handleClick = (item) => {
    // assuming item has category id
    navigate(`/User_service/${item.category}/${item.id}`);
  };

  return (
    <>
    {showNav && (
  <nav className="floating-navbar">
    <div className="nav-pill">

      <div className="nav-train-container">
        <div className="nav-train-track">

          {services.length > 0 ? (
            [...services, ...services].map((item, index) => (
              <div
                key={index} 
                className="nav-item"
                onClick={() => handleClick(item)}
              >
                {item.name}
              </div>
            ))
          ) : (
            <div className="nav-item">Loading...</div>
          )}

        </div>
      </div>

      <button
        className="nav-button"
        onClick={() => navigate('/User_service')}
      >
        Visit Now
      </button>

    </div>
  </nav>
)}
    </>
  );
};

export default Specilal_nav;