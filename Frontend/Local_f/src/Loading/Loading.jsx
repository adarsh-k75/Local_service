import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Using react-icons as per project standard
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loader-content">
        <AiOutlineLoading3Quarters className="spinner-icon" />
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;