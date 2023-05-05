import Phaser from 'phaser';

export function keyUpCallback(event) {
    switch(event.key) {
        case "w":
            this.background.y += 10;
            break;
        case "a":
            this.background.x += 10;
            break;
        case "s":
            this.background.y -= 10;
            break;
        case "d":
            this.background.x -= 10;
            break;
    }
}