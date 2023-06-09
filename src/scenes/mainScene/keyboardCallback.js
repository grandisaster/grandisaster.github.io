import Hero from "../../classes/hero/Hero";

export function keyDownCallback(event) {
    // event.preventDefault();
    if (event.repeat)
        return;

    switch (event.code) {
        case "KeyW":
            if (this.onEarth === true || (this.onEarth === false && this.jumps == 1)) {
                this.moving_vector.y = -1.4
                this.jumps += 1;
            }
            break;
        case "KeyA":
            this.moving_vector.x = -1
            this.character.anims.stop();
            this.character.flipX = true;
            this.character.anims.play('walk-right', true);
            break;
        case "KeyD":
            this.moving_vector.x = 1
            this.character.anims.stop();
            this.character.flipX = false;
            this.character.anims.play('walk-right', true);
            break;
        case "ShiftLeft":
            this.booster = 2
            break;
    }
}

export function keyUpCallback(event) {
    // event.preventDefault();
    switch (event.code) {
        case "KeyA":
            this.moving_vector.x = 0
            if (!this.moving_x()) {
                this.character.anims.stop();
                this.character.flipX = true;
                this.character.anims.play('look-right', true);
            }
            break;
        case "KeyD":
            this.moving_vector.x = 0
            if (!this.moving_x()) {
                this.character.anims.stop();
                this.character.flipX = false;
                this.character.anims.play('look-right', true);
            }
            break;
        case "ShiftLeft":
            this.booster = 1
            break;
    }
}