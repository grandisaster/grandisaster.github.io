import Phaser from 'phaser';
import {keyDownCallback, keyUpCallback} from "./mainScene/keyboardCallback";
import {loadAnimations} from "../assets/animations/hero";
import React from 'react';


export default class MainScene extends Phaser.Scene {
    constructor() {
        super({key: 'MainScene'})
    }

    moving_x() {
        return this.moving_vector.x !== 0;
    }

    preload() {
        this.load.image('menuButton', 'bg/menuButton.png');
        this.load.image('menuButton', 'bg/menuButton.png');
        this.load.image('background', 'assets/locations/Backgrounds/background_castle.png');
        this.load.image('c_ground', 'assets/locations/Castle/ground.png');
        this.load.image('c_walls', 'assets/locations/Castle/walls.png');
        this.load.image('c_environment', 'assets/locations/Castle/environment.png');
        this.load.image('c_env_ojb', 'assets/locations/Castle/env_objects.png');

        this.load.tilemapTiledJSON('map', 'assets/locations/Castle/castle_map.json');
        this.load.image('menuButton', 'bg/menuButton.png');

        this.load.spritesheet('character', 'character/player.png', {
            frameWidth: 48,
            frameHeight: 48,
            margin: 1,
            spacing: 1
        });


    }

    create() {
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0)
        const map = this.make.tilemap({key: 'map'})
        const ground_ts = map.addTilesetImage('castle_ground', 'c_ground')
        const walls = map.addTilesetImage('castle_walls', 'c_walls')
        const env_obj = map.addTilesetImage('env_objects', 'c_env_ojb')
        const env = map.addTilesetImage('castle_environment', 'c_environment')

        map.createLayer('wall_lyr', walls)
        const ground = map.createLayer('ground_lyr', ground_ts)
        map.createLayer('env_obj_lyr', env_obj)
        const columns = map.createLayer('env_obj_lyr2', env_obj)
        map.createLayer('env_lyr', env)
        const platforms = map.createLayer('platform_lyr', ground_ts,{tileWidth: 32, tileHeight: 32})

        ground.setCollisionByProperty({collides: true})
        platforms.setCollisionByProperty({collides: true})
        columns.setCollisionByProperty({collides: true})
        this.matter.world.convertTilemapLayer(ground)
        // this.matter.world.convertTilemapLayer(platforms)
        this.matter.world.convertTilemapLayer(columns)
        // this.matter.world.setBounds(0, 0, 1200, 720);


        this.character = this.matter.add.sprite(200, 400, 'character');
        this.character.setScale(2)
        const {width, height} = this.scale;
        this.cameras.main.startFollow(this.character, true, 0.05, 0.05);
        const characterBody = this.character.body;

        characterBody.collisionFilter.category = 1;
        characterBody.restitution = 0.9;
        characterBody.friction = 0;
        characterBody.collisionFilter.mask = 0x0001; // Здесь 0x0001 представляет категорию столкновений, с которой персонаж может сталкиваться

// Примените границы мира Matter.js
        this.matter.world.setBounds(0, 0, 1200, 720);
        // this.character.body.setSize(16, 32);
        console.log(this.character.body);


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
        this.jumps = 0;


        this.menuButton = this.add.image(20, 20, 'menuButton').setOrigin(0, 0).setScale(0.05)

            .setInteractive()
            .on('pointerdown', () => {
                    this.game.scene.pause('MainScene');
                    if (window.confirm('Вы уверены, что хотите выйти в меню?')) {
                        this.game.events.emit('menu');
                    } else {
                        this.game.scene.resume('MainScene');
                    }
                }
            );

    }

    update(time, delta) {

        // on earth check
        //|| bodyB.gameObject.layer.name === 'platform_lyr'
        // this.onEarth = false;
        // this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
        //     if (bodyA.gameObject === this.character) {
        //         if (bodyB.gameObject.layer.name === 'ground_lyr') { 
        //             this.onEarth = true;
        //             this.jumps = 2;
        //         }
        //     }
        // });

        //jump control
        if (this.cursors.up.isDown && this.jumps !== 0) {
            this.moving_vector.y = -1;
            this.jumps -= 1;
        }

        const speed = 2;
        // console.log(time, this.moving_vector)
        this.character.setVelocity(this.moving_vector.x * speed * this.booster,
            this.moving_vector.y * speed * 5);

        if (Math.abs(this.moving_vector.y - 0.5) > 0.00001 && this.jumps !== 0) {
            this.moving_vector.y += 0.1;
        } else {
            this.jumps = 0;
            if (this.onEarth) {
                this.moving_vector.y = 0;
            }
        }
    }
}