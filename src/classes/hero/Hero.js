import Phaser from "phaser";

export default class Hero extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, health = 100, damage = 33) {
        super(scene.matter.world, x, y, texture);
        scene.add.existing(this);
        this.setExistingBody(this.body);

        // Set up player properties
        this.jumpForce = -300; // Adjust the jump force as needed
        this.isJumping = false;

        this.health = health;
        this.damage = damage;
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
