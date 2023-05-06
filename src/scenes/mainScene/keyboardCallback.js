import Hero from "../../classes/hero/Hero";

export function keyDownCallback(event) {
    // event.preventDefault();
    if(event.repeat)
        return;

    switch (event.code) {
        case "KeyW":
            this.moving_vector.y = -1
            break;
        case "KeyA":
            this.moving_vector.x = -1
            break;
        case "KeyS":
            this.moving_vector.y = 1
            break;
        case "KeyD":
            this.moving_vector.x = 1
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
            break;
        case "KeyA":
            this.moving_vector.x = 0
            break;
        case "KeyS":
            this.moving_vector.y = 0
            break;
        case "KeyD":
            this.moving_vector.x = 0
            break;
        case "ShiftLeft":
            this.booster = 1
            break;
        default:
            console.log("Eta default")
    }

    console.log(event.code, " UP ", this.moving_vector, this.booster)
}