import Phaser from 'phaser';
import Hero from '../classes/hero/Hero'
import {keyDownCallback, keyUpCallback} from "./mainScene/keyboardCallback";
import {loadAnimations} from "../assets/animations/hero";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({key: 'MainScene'})
    }

    moving() {
        return this.moving_vector.x !== 0 || this.moving_vector.y !== 0;
    }

    preload() {
        this.load.image('background', 'bg/background.jpg');

        this.load.spritesheet('character', 'character/player.png', {
            frameWidth: 48,
            frameHeight: 48,
            margin: 1,
            spacing: 1
        });

    }

    create() {
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.character = this.physics.add.sprite(200, 400, 'character');
        // this.character = new Hero(this, 200, 400, 'character');
        this.character.setScale(4);
        this.character.setCollideWorldBounds(true);
        // set normal collider
        this.character.body.setSize(16, 32);

        this.moving_vector = {
            x: 0,
            y: 0
        };
        this.booster = 1;

        loadAnimations(this);

        this.input.keyboard.on('keydown', keyDownCallback, this);
        this.input.keyboard.on('keyup', keyUpCallback, this);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.character.flipX = true;

    }

    update(time, delta) {
        const marginTop = 250;
        const marginBottom = 520;

        // Get the character's current position
        const { x, y } = this.character;

        // Check if the character is within the allowed vertical range
        if (y < marginTop) {
            this.character.setY(marginTop);
        } else if (y > marginBottom) {
            this.character.setY(marginBottom);
        }

        const speed = 200;
        // console.log(time, this.moving_vector)
        this.character.setVelocity(this.moving_vector.x * speed * this.booster,
            this.moving_vector.y * speed * this.booster);
    }
}