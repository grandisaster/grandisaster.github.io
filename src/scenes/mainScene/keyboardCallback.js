export function keyUpCallback(event) {
    switch(event.code) {
        case "KeyW":
            this.background.y += 10;
            break;
        case "KeyA":
            this.background.x += 10;
            break;
        case "KeyS":
            this.background.y -= 10;
            break;
        case "KeyD":
            this.background.x -= 10;
            break;
    }
}