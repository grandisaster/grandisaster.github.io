import Phaser from 'phaser';
import {keyDownCallback, keyUpCallback} from "./mainScene/keyboardCallback";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({key: 'MainScene'})
    }

    preload() {
        this.load.image('background', 'bg/background.jpg');
        
        this.load.spritesheet('character', 'character/player.png', {
            frameWidth: 32,
            frameHeight: 48,
            margin: 1,
            spacing: 1
        });

    }

    create() {
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.character = this.physics.add.sprite(200, 400, 'character');
        this.character.setScale(4);
        this.character.setCollideWorldBounds(true);
        // set normal collider
        this.character.body.setSize(16, 32);


        this.input.keyboard.on('keydown', keyDownCallback, this);
        this.input.keyboard.on('keyup', keyUpCallback, this);
        this.cursors = this.input.keyboard.createCursorKeys();

        // this.anims.create({
        //     key: 'walk-right',
        //     frames: this.anims.generateFrameNumbers('character', {
        //     frames: [24, 25, 26, 27, 28, 29, 30]}),
        //     frameRate: 10,
        //     repeat: -1
        //   });
        
        //   this.anims.create({
        //     key: 'walk-left',
        //     frames: this.anims.generateFrameNumbers('character', { start: 4, end: 7 }),
        //     frameRate: 10,
        //     repeat: -1
        //   });

        //   this.character.anims.play('walk-right', true);
    }

    update() {
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

        // if (this.cursors.left.isDown) {
        //     this.character.anims.play('walk-left', true);
        //   }
        //   else if (this.cursors.right.isDown) {
        //     this.character.anims.play('walk-right', true);
        //   }
        //   else {
        //     this.character.setVelocityX(0);
        //     this.character.anims.stop(); // Stop animation
        //   }
    }
}