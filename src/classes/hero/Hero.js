import Phaser from "phaser";

class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);
      scene.add.existing(this);
  
      // Set up player properties
      this.jumpForce = -300; // Adjust the jump force as needed
      this.isJumping = false;
    }
  
    update() {
      // Update logic for the player
      if (this.isJumping && this.body.onFloor()) {
        this.isJumping = false;
      }
    }
  
    jump() {
      if (!this.isJumping && this.body.onFloor()) {
        this.body.setVelocityY(this.jumpForce);
        this.isJumping = true;
      }
    }
  }
  
  export default Player;