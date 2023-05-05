import bridge from '@vkontakte/vk-bridge';
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const Game = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: gameRef.current, 
      width: 1500,
      height: 720,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 },
          debug: false
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    function preload() {
      this.load.image('background', 'bg/background.jpg'); 
      this.load.spritesheet('character', 'character/player.png', { 
        frameWidth: 32,
        frameHeight: 48 
      });
	  }

    function create() {
      // Add the background image
      this.add.image(0, 0, 'background').setOrigin(0, 0);

      this.character = this.physics.add.sprite(200, 400, 'character');
      this.physics.world.gravity.y = 0;
      this.character.setVelocityX(0);
      this.character.setVelocityY(0);
      this.character.setAccelerationX(0); 
      this.character.setAccelerationY(0); 

      this.character.setScale(5)

      this.cursors = this.input.keyboard.createCursorKeys();

    }

    function update() {
      const minX = 0;
      const maxX = config.width;
      const minY = 0 + config.height / 3.2;
      const maxY = config.height - this.character.height * 4.5;

      this.character.x = Phaser.Math.Clamp(this.character.x, minX, maxX);
      this.character.y = Phaser.Math.Clamp(this.character.y, minY, maxY);
      
      document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
          this.character.setVelocityX(-160);
        } else if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
          this.character.setVelocityX(160);
        }
      
        if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
          this.character.setVelocityY(-160);
        } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
          this.character.setVelocityY(160);
        }
      });
      
      document.addEventListener('keyup', (event) => {
        if ((event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') && !event.repeat) {
          this.character.setVelocityX(0);
        } else if ((event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') && !event.repeat) {
          this.character.setVelocityX(0);
        }
      
        if ((event.key === 'ArrowUp' || event.key.toLowerCase() === 'w') && !event.repeat) {
          this.character.setVelocityY(0);
        } else if ((event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') && !event.repeat) {
          this.character.setVelocityY(0);
        }
      });
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
      <Game />
    </div>
  );
}

export default App;
