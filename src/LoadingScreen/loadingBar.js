import React from 'react';
import './loadingScreen.css';

const LoadingBar = ({ progress }) => {
  return (
    <div className="loading-bar">
      <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default LoadingBar;

