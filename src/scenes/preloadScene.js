import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' })
    }

    preload() {
        console.log("Loaded preloadScene")
    }

    create() {
        this.scene.start('MainScene')
    }
}