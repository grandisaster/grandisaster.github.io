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
	  this.load.image('background', 'background.jpg'); 
	}

	function create() {
	  // Add the background image
	  this.add.image(0, 0, 'background').setOrigin(0, 0);
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