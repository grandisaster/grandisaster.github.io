import bridge from '@vkontakte/vk-bridge';
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
      width: 800,
      height: 600,
      scene: [preloadScene, mainScene],
    };

    const game = new Phaser.Game(config);

    return () => {
      gameRef.current.innerHTML = '';
    };
  }, []);

  return <div ref={gameRef} />;
};

function App() {
  bridge.send("VKWebAppInit", {});
  return (
    <div className="App">
      <h1>My Phaser Game</h1>
      <Game />
    </div>
  );
}

export default App;