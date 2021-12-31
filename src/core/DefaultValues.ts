import { ShadowFactory } from './class/Shadow/ShadowFactory';
import { Position } from './Interfaces';

export const DEFAULT_VALUES = {
    POSITION: Position.Bottom,
    OFFSET_X: 10,
    OFFSET_Y: 10,
    TRANSITION_DURATION: 300,

    SHADOW: { type: ShadowFactory.TYPE_NULL },
    SHADOW_COLOR: 'rgba(0, 0, 0, .3)',
    SHADOW_OFFSET: 10,
    SHADOW_BORDER_RADIUS: 5,
    SHADOW_ROOT_COMPONENT: document.documentElement,

    ARROW_SIZE: 5,
    ARROW_COLOR: '#fff',
    ARROW_OFFSET: 10,
};
