import Phaser from 'phaser';
import {keyDownCallback, keyUpCallback} from "./mainScene/keyboardCallback";
import React from 'react';


export default class MainScene extends Phaser.Scene {    
    constructor() {
        super({key: 'MainScene'})
    }

    preload() {
        this.load.image('menuButton', 'bg/menuButton.png'); 
        this.load.image('background', 'assets/locations/Backgrounds/background_castle.jpg');
        this.load.image('c_ground', 'assets/locations/Castle/ground.png');
        this.load.image('c_walls', 'assets/locations/Castle/walls.png');
        this.load.image('c_environment', 'assets/locations/Castle/environment.png');
        this.load.image('c_env_ojb', 'assets/locations/Castle/env_objects.png');
        
        this.load.tilemapTiledJSON('tilemap', 'assets/locations/Castle/castle_map.json');

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
        this.character.body.setSize(16, 32);

        const map = this.make.tilemap({ key: 'tilemap' });
        const ground_lyr = map.addTilesetImage('castle_ground', 'c_ground');
        const wall_lyr = map.addTilesetImage('castle_walls', 'c_walls');
        const env_obj_lyr = map.addTilesetImage('env_objects', 'c_env_ojb');
        const env_lyr = map.addTilesetImage('castle_environment', 'c_environment');

        const wall = map.createLayer('wall_lyr', wall_lyr);
        const ground = map.createLayer('ground_lyr', ground_lyr);
        const env_obj = map.createLayer('env_obj_lyr', env_obj_lyr);
        const env_obj2 = map.createLayer('env_obj_lyr2', env_obj_lyr);
        const env = map.createLayer('env_lyr', env_lyr);

        ground.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(ground);

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