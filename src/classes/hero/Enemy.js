import Phaser from "phaser";

export default class Hero extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, health = 100, damage = 20) {
        super(scene.matter.world, x, y, texture);
        scene.add.existing(this);
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const width = 32; // Adjust the width as needed
        const height = 32; // Adjust the height as needed
        const options = {
            chamfer: {},
            frictionAir: 0.1,
        };
        const hitbox = Bodies.rectangle(400, 200, width, height, options);
        this.setExistingBody(hitbox);

        // Set up player properties
        this.setOrigin(0.5, 0.5); // Adjust the origin based on the new hitbox shape
        this.setFixedRotation(); // Prevent the body from rotating

        // Set up player properties
        this.jumpForce = -300; // Adjust the jump force as needed
        this.isJumping = false;

        this.health = health;
        this.damage = damage;
    }
}
