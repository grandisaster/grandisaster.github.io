export function keyDownCallback(event) {
    // event.preventDefault();
    if (event.repeat)
        return;

    switch (event.code) {
        case "KeyW":
            this.character.jump();
            break;
        case "KeyA":
            this.character.moving_vector.x = -1
            this.character.anims.stop();
            this.character.flipX = true;
            this.character.anims.play('walk-right', true);
            break;
        case "KeyD":
            this.character.moving_vector.x = 1
            this.character.anims.stop();
            this.character.flipX = false;
            this.character.anims.play('walk-right', true);
            break;
        case "ShiftLeft":
            this.character.booster = 2
            break;
        default:
    }
}

export function keyUpCallback(event) {
    // event.preventDefault();
    switch (event.code) {
        case "KeyA":
            this.character.moving_vector.x = 0
            if (!this.moving_x()) {
                this.character.anims.stop();
                this.character.flipX = true;
                this.character.anims.play('look-right', true);
            }
            break;
        case "KeyD":
            this.character.moving_vector.x = 0
            if (!this.moving_x()) {
                this.character.anims.stop();
                this.character.flipX = false;
                this.character.anims.play('look-right', true);
            }
            break;
        case "ShiftLeft":
            this.character.booster = 1
            break;
        default:
    }
}