import Data from './services/service';
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import preloadScene from './scenes/preloadScene';
import mainScene from './scenes/mainScene';

const Game = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: gameRef.current, 
      width: 1200,
      height: 720,
      pixelArt: true,
      iso: {
        enable: true,
        tileZ: 32 // Настройте высоту тайла для контроля эффекта 3D
      },
      scene: [preloadScene, mainScene],
      physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 0 },
              debug: false
          }
      }
    };

    const game = new Phaser.Game(config);

    return () => {
      gameRef.current.innerHTML = '';
    };
  }, []);

  return <div ref={gameRef} />;
};

function App() {
  let d = new Data();
  d.sendBridge()
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
