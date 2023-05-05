import bridge from '@vkontakte/vk-bridge';
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const Game = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: gameRef.current, 
      width: 800,
      height: 600,
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    function preload() {
      // Preload assets
    }

    function create() {
      // Create game objects
    }

    function update() {
      // Game logic updates
    }

    new Phaser.Game(config);

    // Clean up Phaser game instance
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