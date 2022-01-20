import { Position } from './Position';

export const DEFAULT_VALUES = {
    position: Position.Bottom,
    offsetX: 10,
    offsetY: 10,
    transitionDuration: 200,
    shadow: {
        enabled: true,
        color: 'rgba(0, 0, 0, .3)',
        offset: 10,
        borderRadius: 5,
        rootComponent: document.documentElement,
        disableScroll: true,
    },
    ARROW_SIZE: 5,
    ARROW_COLOR: '#fff',
    ARROW_OFFSET: 10,
};
