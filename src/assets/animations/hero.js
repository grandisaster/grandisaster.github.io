export function loadAnimations(context) {
    context.anims.create({
        key: 'walk-right',
        frames: context.anims.generateFrameNumbers('character', { start: 20, end: 22 }),
        frameRate: 10,
        repeat: -1
    });

    context.anims.create({
        key: 'walk-back',
        frames: context.anims.generateFrameNumbers('character', { start: 25, end: 29 }),
        frameRate: 10,
        repeat: -1
    });

    context.anims.create({
        key: 'walk-up',
        frames: context.anims.generateFrameNumbers('character', { start: 15, end: 17 }),
        frameRate: 10,
        repeat: -1
    });

    context.anims.create({
        key: 'look-right',
        frames: context.anims.generateFrameNumbers('character', { start: 5, end: 5 }),
        frameRate: 10,
        repeat: 0
    });

    context.anims.create({
        key: 'look-up',
        frames: context.anims.generateFrameNumbers('character', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: 0
    });

    context.anims.create({
        key: 'look-down',
        frames: context.anims.generateFrameNumbers('character', { start: 10, end: 10 }),
        frameRate: 10,
        repeat: 0
    });
}