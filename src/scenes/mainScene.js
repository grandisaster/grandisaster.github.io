import Phaser from 'phaser';
import {keyUpCallback} from "./mainScene/keyboardCallback";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' })
    }

    preload() {
        this.load.image('background', 'background.jpg');
    }

    create() {
        this.background = this.add.image(400, 300, 'background');
        this.background.setScale(0.625);

        this.input.keyboard.on('keyup', keyUpCallback, this);
        this.cursors = this.input.keyboard.createCursorKeys();
    }
}