import React, { useState, useEffect } from 'react';
import { IoIosPin } from 'react-icons/io'; // Location Pin from react-icons
import './Mapping.css';

const RadarLoader = () => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    // Defines where the "providers" will appear (dummy data for the simulation)
    const providerLocations = [
      { top: '30%', left: '70%' },
      { top: '65%', left: '25%' },
      { top: '45%', left: '55%' },
      { top: '20%', left: '40%' },
      { top: '80%', left: '75%' },
    ];

    let currentDotIndex = 0;

    // Timer to add dots one by one like a radar sweep
    const intervalId = setInterval(() => {
      if (currentDotIndex < providerLocations.length) {
        setDots((prevDots) => [...prevDots, providerLocations[currentDotIndex]]);
        currentDotIndex++;
      } else {
        clearInterval(intervalId); // Stop once all dummy providers are shown
      }
    }, 800); // 800ms delay between dots appearing

    return () => clearInterval(intervalId); // Clean up timer on unmount
  }, []);

  return (
    <div className="radar-overlay">
      <div className="radar-container">
        
        {/* Pulsing Search Radius Circles */}
        <div className="pulse-circle c1"></div>
        <div className="pulse-circle c2"></div>
        <div className="pulse-circle c3"></div>

        {/* Center User Pin (Main Pointer) */}
        <div className="center-pin">
          <IoIosPin size={50} />
          <div className="user-dot"></div>
        </div>

        {/* Floating Provider Dots (The "Boat Radar" points) */}
        {dots.map((loc, index) => (
          <div 
            key={index} 
            className="provider-dot fade-in-dot" 
            style={{ top: loc.top, left: loc.left }}
          ></div>
        ))}

        <p className="radar-text">Searching for nearby providers...</p>
      </div>
    </div>
  );
};

export default RadarLoader;