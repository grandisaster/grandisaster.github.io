import Phaser from 'phaser';
import {keyDownCallback, keyUpCallback} from "./mainScene/keyboardCallback";
import {mouseCallback} from "./mainScene/mouseCallback";
import {loadAnimations} from "../assets/animations/hero";
import Hero from '../classes/hero/Hero';
import Enemy from '../classes/hero/Enemy';


export default class MainScene extends Phaser.Scene {
    constructor() {
        super({key: 'MainScene'})
        this.onEarth = false;
    }

    moving_x() {
        return this.character.moving_vector.x !== 0;
    }

    preload() {
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

        this.load.spritesheet('enemy', 'assets/enemies/bosses/Archer/spritesheet.png', {
            frameWidth: 48,
            frameHeight: 48,
            margin: 1,
            spacing: 1
        });
    }

    create() {
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0)
        const map = this.make.tilemap({key: 'map'})
        const ground_lyr = map.addTilesetImage('castle_ground', 'c_ground')
        const walls = map.addTilesetImage('castle_walls', 'c_walls')
        const env_obj = map.addTilesetImage('env_objects', 'c_env_ojb')
        const env = map.addTilesetImage('castle_environment', 'c_environment')

        map.createLayer('wall_lyr', walls)
        const ground = map.createLayer('ground_lyr', ground_lyr)
        map.createLayer('env_obj_lyr', env_obj)
        const columns = map.createLayer('env_obj_lyr2', env_obj)
        map.createLayer('env_lyr', env)
        const platforms = map.createLayer('platform_lyr', ground_lyr)

        ground.setCollisionByProperty({collides: true})
        platforms.setCollisionByProperty({collides: true})
        columns.setCollisionByProperty({collides: true})
        this.matter.world.convertTilemapLayer(ground)
        // this.matter.world.convertTilemapLayer(platforms)
        this.matter.world.convertTilemapLayer(columns)

        // this.character = this.matter.add.sprite(200, 400, 'character').setFixedRotation()
        this.character = new Hero(this, 400, 200, 'character');
        this.character.setScale(2);
        this.character.setFixedRotation();
        const characterBody = this.character.body;

        characterBody.collisionFilter.category = 1;
        characterBody.restitution = 0.9;
        characterBody.friction = 0;
        characterBody.collisionFilter.mask = 0x0001; // Здесь 0x0001 представляет категорию столкновений, с которой персонаж может сталкиваться
        this.matter.world.setBounds(0, 0, 1200, 720);


        this.enemyGroup = this.add.group();

        this.enemy = new Enemy(this, 100, 400, 'enemy');
        this.enemyGroup.add(this.enemy);
        this.enemy.setScale(2);
        this.enemy.setFixedRotation();
        const enemyBody = this.enemy.body;

        enemyBody.collisionFilter.category = 1;
        enemyBody.restitution = 0.9;
        enemyBody.friction = 0;
        enemyBody.collisionFilter.mask = 0x0001; // Здесь 0x0001 представляет категорию столкновений, с которой персонаж может сталкиваться
        this.matter.world.setBounds(0, 0, 1200, 720);



        loadAnimations(this);

        this.input.keyboard.on('keydown', keyDownCallback, this);
        this.input.keyboard.on('keyup', keyUpCallback, this);
        //mouse click
        this.input.on('pointerdown', mouseCallback, this);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.character.flipX = true;


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
        const speed = 7.5;

        if(Math.abs(this.character.body.velocity.y) < 0.9) {
            this.character.setVelocity(this.character.body.x, 0);
            this.character.onEarth = true;
        } else {
            this.character.onEarth = false;
        }

        if (this.character.isJumping && this.character.onEarth) {
            this.character.isJumping = false;
        }

        this.character.setVelocity(this.character.moving_vector.x * speed * this.character.booster, this.character.body.velocity.y);
    }
}