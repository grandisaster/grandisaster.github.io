import Data from './services/service';
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import mainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene'
import LoadingScreen from './LoadingScreen/loading';
import { useState } from 'react';
import Menu from './MenuScreen/menu';

const Game = ({ setIsGame }) => {
  const gameRef = useRef(null);

  useEffect(() => {
    const GAME_WIDTH = 1200;
    const GAME_HEIGHT = 720;

    const config = {
      type: Phaser.AUTO,
      parent: gameRef.current, 
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      pixelArt: true,
      // center 
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },

      iso: {
        enable: true,
        tileZ: 32 // Настройте высоту тайла для контроля эффекта 3D
      },
      scene: [PreloadScene, mainScene],
      physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 0 },
              debug: false
          }
      }
    };

    const game = new Phaser.Game(config);

    game.events.on('menu', () => {
      setIsGame(false);
      console.log('menu');
    });

      

    return () => {
      if (gameRef.current === null) {
        return;
      }
      else {
        gameRef.current.innerHTML = '';
      }
     
    };
  }, []);

  return <div ref={gameRef} />;
};


export { Game } ;

function App() {
  let d = new Data();
  d.sendBridge()
  const [isLoaded, setIsLoaded] = useState(false); 
  const [isGame, setIsGame] = useState(false);

  const handlePlayButtonClick = () => {
    setIsGame(true);
  };

    if (isGame && isLoaded) {
      return <Game setIsGame={setIsGame} />;
    } else if (isLoaded && !isGame) {
      return <Menu onPlayButtonClick={handlePlayButtonClick} />;
    } else {
      return <LoadingScreen onLoaded={() => setIsLoaded(true)} />;
    }
  }

export default App ;
