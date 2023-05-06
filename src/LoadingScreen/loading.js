import React, { useState, useEffect } from "react";

import "./loadingBar";
import ParallaxBackground from '../icons/ParallaxBackground.aseprite';

const BackgroundImage = () => {
  return <img src={ParallaxBackground} alt="My Image" />;
};


function LoadingScreen({ onLoaded }) {
    
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);


  if (isLoading) {
    return (
        <div className="loading-screen" style={{ background:{ BackgroundImage }}}>
        <h1 style={{ fontFamily: 'PressStart2P', color:'white'}}>Infinite Chaos</h1>
        <div className="loading-bar">
          <div className="loading-progress" />
          <p className="loading-text" style = {{fontFamily: 'PressStart2P', color:'white'}}>Loading... </p>
        </div>
       </div> 

    );
    } else {
        return (
            <div className="loading-screen">
            <h1 style={{ fontFamily: 'PressStart2P', color:'white'}}>Infinite Chaos</h1>
            <div className="loading-bar">
            <div className="loading-progress" />
            </div>
       
        <button className='custom-button' style={{fontFamily: 'PressStart2P'}} onClick={onLoaded}>Войти</button>
        </div> 
        );
  


 
}
}

export default LoadingScreen;