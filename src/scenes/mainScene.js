import Phaser from 'phaser';
import {keyDownCallback, keyUpCallback} from "./mainScene/keyboardCallback";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({key: 'MainScene'})
    }

    preload() {
        this.load.image('background', 'assets/locations/Backgrounds/background_castle.jpg');
        this.load.image('c_ground', 'assets/locations/Castle/ground.png');
        this.load.image('c_walls', 'assets/locations/Castle/walls.png');
        this.load.image('c_environment', 'assets/locations/Castle/environment.png');
        this.load.image('c_env_ojb', 'assets/locations/Castle/env_objects.png');
        
        this.load.tilemapTiledJSON('map', 'assets/locations/Castle/castle_map.json');

        this.load.spritesheet('character', 'character/player.png', {
            frameWidth: 32,
            frameHeight: 48,
            margin: 1,
            spacing: 1
        });

    }

    create() {
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0)
        const map = this.make.tilemap({ key: 'map' })
        const ground_lyr = map.addTilesetImage('castle_ground', 'c_ground')
        const walls = map.addTilesetImage('castle_walls', 'c_walls')
        const env_obj = map.addTilesetImage('env_objects', 'c_env_ojb')
        const env = map.addTilesetImage('castle_environment', 'c_environment')

        map.createLayer('wall_lyr', walls)
        const ground = map.createLayer('ground_lyr', ground_lyr)
        map.createLayer('env_obj_lyr', env_obj)
        map.createLayer('env_obj_lyr2', env_obj)
        map.createLayer('env_lyr', env)

        ground.setCollisionByProperty({ collides: true })
        this.matter.world.convertTilemapLayer(ground)



        this.character = this.physics.add.sprite(200, 400, 'character');
        this.cameras.scrollX = 200;
        this.cameras.scrollY = 400;
        this.character.setScale(4);
        this.character.setCollideWorldBounds(true);
        this.character.body.setSize(16, 32);
        this.physics.world.setBounds(0, 0, 1200, 720);


        this.input.keyboard.on('keydown', keyDownCallback, this);
        this.input.keyboard.on('keyup', keyUpCallback, this);
        this.cursors = this.input.keyboard.createCursorKeys();

        //addition

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
    
        // Check if the character is on the ground
        if (this.character.body.touching.down) {
            // If so, cancel the gravitational pull
            this.character.setVelocityY(0);
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