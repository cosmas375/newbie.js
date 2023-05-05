import { Vue3ComponentsFactory } from './core/class/ComponentsFactory/Vue3ComponentsFactory';
import { Globals } from './core/class/Globals';
import { Newbie } from './core/class/Newbie';
import { Position } from './core/Position';

export default Newbie;

export const NewbiePlugin = {
    install(app: any, { createApp }: { createApp: any }) {
        Globals.componentsFactory = new Vue3ComponentsFactory({ createApp });
    },
};

export const NewbiePosition = Position;
