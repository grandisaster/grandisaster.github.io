import Phaser from 'phaser';
import {keyDownCallback, keyUpCallback} from "./mainScene/keyboardCallback";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({key: 'MainScene'})
    }

    preload() {
        this.load.image('background', 'background.jpg');
        // add character
        // this.load.spritesheet('character', 'character.png', {
        //     frameWidth: 32,
        //     frameHeight: 48
        // });
        //how to add margin from top
        this.load.spritesheet('character', 'character.png', {
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
    }
}