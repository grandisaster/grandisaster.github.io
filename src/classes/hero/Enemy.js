import Phaser from "phaser";

export default class Hero extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, health = 100, damage = 20) {
        super(scene.matter.world, x, y, texture);
        scene.add.existing(this);
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const width = 22; // Adjust the width as needed
        const height = 32; // Adjust the height as needed
        const options = {
            chamfer: {},
            frictionAir: 0.1,
        };
        const hitbox = Bodies.rectangle(400, 200, width, height, options);
        this.setExistingBody(hitbox);


        this.health = health;
        this.damage = damage;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.destroy();
        }
        console.log(`Enemy health: ${this.health}`);
    }
}
