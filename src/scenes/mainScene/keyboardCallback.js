const speed = 160;
let currentBooster = 1;

export function keyDownCallback(event) {
    if (event.repeat) {
        return;
    }

    if (!this.character.body.touching.none) {
        alert("Ты пидор");
    }

    let currentSpeed = currentBooster * speed;

    switch (event.code) {
        case "KeyW":
            this.character.setVelocityY(-currentSpeed);
            break;
        case "KeyA":
            this.character.setVelocityX(-currentSpeed);
            break;
        case "KeyS":
            console.log(event);
            this.character.setVelocityY(currentSpeed);
            break;
        case "KeyD":
            this.character.setVelocityX(currentSpeed);
            break;
        case "ShiftLeft":
            if(currentBooster !== 1.5) {
                const velocity_x = this.character.body.velocity.x,
                    velocity_y = this.character.body.velocity.y;
                this.character.setVelocity(velocity_x / currentBooster * 1.5, velocity_y / currentBooster * 1.5);
                currentBooster = 1.5;
            }
            break;
    }
}

export function keyUpCallback(event) {
    if (event.repeat) {
        return;
    }

    switch (event.code) {
        case "KeyW":
            this.character.setVelocityY(0);
            break;
        case "KeyA":
            this.character.setVelocityX(0);
            break;
        case "KeyS":
            this.character.setVelocityY(0);
            break;
        case "KeyD":
            this.character.setVelocityX(0);
            break;
        case "ShiftLeft":
            if(currentBooster !== 1) {
                const velocity_x = this.character.body.velocity.x,
                    velocity_y = this.character.body.velocity.y;
                this.character.setVelocity(velocity_x / currentBooster, velocity_y / currentBooster);
                currentBooster = 1;
            }
            break;
    }
}