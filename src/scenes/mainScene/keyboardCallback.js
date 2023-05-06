import Hero from "../../classes/hero/Hero";

const speed = 160;
let currentBooster = 1;

const keysPressed = {
  KeyW: false,
  KeyA: false,
  KeyS: false,
  KeyD: false,
  ShiftLeft: false,
};

export function keyDownCallback(event) {
  if (event.repeat) {
    return;
  }

  keysPressed[event.code] = true;

  if (event.code === "ShiftLeft") {
    if (currentBooster !== 1.5) {
      const velocity_x = this.character.body.velocity.x;
      this.character.setVelocity(
        (velocity_x / currentBooster) * 1.5);
      currentBooster = 1.5;
    }
  }

  let currentSpeed = currentBooster * speed;
  if (event.code === "KeyW") {
    if (this.character.body.touching.down) {
      const jumpVelocity = -speed * 3; 
      this.character.setVelocityY(jumpVelocity);
    }
  } else if (event.code === "KeyA") {
    this.character.setVelocityX(-currentSpeed);
  } else if (event.code === "KeyS") {
    this.character.setVelocityY(currentSpeed);
  } else if (event.code === "KeyD") {
    this.character.setVelocityX(currentSpeed);
  }
}

export function keyUpCallback(event) {
  if (event.repeat) {
    return;
  }

  keysPressed[event.code] = false;

  if (event.code === "ShiftLeft") {
    if (currentBooster !== 1) {
      const velocity_x = this.character.body.velocity.x;
      this.character.setVelocity(
        velocity_x / currentBooster,);
      currentBooster = 1;
    }
  }

  let currentSpeed = currentBooster * speed;
  if (event.code === "KeyW") {
    // Do nothing
  } else if (event.code === "KeyA") {
    if (!keysPressed.KeyD) {
      this.character.setVelocityX(0);
    }
  } else if (event.code === "KeyS") {
    // Do nothing
  } else if (event.code === "KeyD") {
    if (!keysPressed.KeyA) {
      this.character.setVelocityX(0);
    }
  }
}