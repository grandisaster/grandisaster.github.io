export function mouseCallback(pointer) {
    switch(pointer.button) {
        case 0:
            this.character.anims.stop();
            this.character.anims.startAnimation('fight-right');
            this.character.attack();
            break;
        default:
    }
}