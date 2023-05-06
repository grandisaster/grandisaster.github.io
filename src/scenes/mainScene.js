import Phaser from 'phaser';
import {keyDownCallback, keyUpCallback} from "./mainScene/keyboardCallback";
import React from 'react';


export default class MainScene extends Phaser.Scene {    
    constructor() {
        super({key: 'MainScene'})
    }

    preload() {
        this.load.image('background', 'bg/background.jpg');
        this.load.image('menuButton', 'bg/menuButton.png'); 
        
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
        
        this.menuButton = this.add.image(20, 20, 'menuButton').setOrigin(0, 0).setScale(0.05)
        
        .setInteractive()
        .on('pointerdown', () => {
            this.game.scene.stop('MainScene');
            if (window.confirm('Вы уверены, что хотите выйти в меню?')) {
                this.game.events.emit('menu');
            }
            else {
                this.game.scene.start('MainScene');
            }
        }
        );

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

    }
}