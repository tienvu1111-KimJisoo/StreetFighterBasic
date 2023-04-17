export const Control = {
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down',

    LIGHT_PUNCH: 'lightPunch',
    MEDIUM_PUNCH: 'mediumPunch',
    HEAVY_PUNCH: 'heavyPunch',
    LIGHT_KICK: 'lightKick',
    MEDIUM_KICK: 'mediumKick',
    HEAVY_KICK: 'heavyKick',
};

export const controls = [
    {
        keyboard: {
            [Control.LEFT]: 'KeyA',
            [Control.RIGHT]: 'KeyD',
            [Control.UP]: 'KeyW',
            [Control.DOWN]: 'KeyS',

            [Control.LIGHT_PUNCH]: 'KeyJ',
            [Control.MEDIUM_PUNCH]: 'KeyK',
            [Control.HEAVY_PUNCH]: 'KeyL',

            [Control.LIGHT_KICK]: 'KeyU',
            [Control.MEDIUM_KICK]: 'KeyI',
            [Control.HEAVY_KICK]: 'KeyO',

        },
    },

    {
        keyboard: {
            [Control.LEFT]: 'ArrowLeft',
            [Control.RIGHT]: 'ArrowRight',
            [Control.UP]: 'ArrowUp',
            [Control.DOWN]: 'ArrowDown',

            [Control.LIGHT_PUNCH]: 'Numpad1',
            [Control.MEDIUM_PUNCH]: 'Numpad2',
            [Control.HEAVY_PUNCH]: 'Numpad3',

            [Control.LIGHT_KICK]: 'Numpad4',
            [Control.MEDIUM_KICK]: 'Numpad5',
            [Control.HEAVY_KICK]: 'Numpad6',
        },
    },
];