import Hero from "../../classes/hero/Hero";

export function keyDownCallback(event) {
    // event.preventDefault();
    if(event.repeat)
        return;

    switch (event.code) {
        case "KeyW":
            this.moving_vector.y = -1
            this.character.anims.stop();
            this.character.anims.play('walk-back', true);
            break;
        case "KeyA":
            this.moving_vector.x = -1
            this.character.anims.stop();
            this.character.flipX = true;
            this.character.anims.play('walk-right', true);
            break;
        case "KeyS":
            this.moving_vector.y = 1
            this.character.anims.stop();
            this.character.anims.play('walk-up', true);
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
        default:
            console.log("Eta default")
    }

    console.log(event.code, " DOWN ", this.booster)
}

export function keyUpCallback(event) {
    // event.preventDefault();
    switch (event.code) {
        case "KeyW":
            this.moving_vector.y = 0
            if(!this.moving()) {
                this.character.anims.stop();
                this.character.anims.play('look-down', true);
            }
            break;
        case "KeyA":
            this.moving_vector.x = 0
            if(!this.moving()) {
                this.character.anims.stop();
                this.character.flipX = true;
                this.character.anims.play('look-right', true);
            }
            break;
        case "KeyS":
            this.moving_vector.y = 0
            if(!this.moving()) {
                this.character.anims.stop();
                this.character.anims.play('look-up', true);
            }
            break;
        case "KeyD":
            this.moving_vector.x = 0
            if(!this.moving()) {
                this.character.anims.stop();
                this.character.flipX = false;
                this.character.anims.play('look-right', true);
            }
            break;
        case "ShiftLeft":
            this.booster = 1
            break;
        default:
            console.log("Eta default")
    }

    console.log(event.code, " UP ", this.moving_vector, this.booster)
}