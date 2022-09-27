import { Newbie } from './core/class/Newbie';
import { Globals } from './core/class/Globals';
import { Vue2ComponentsFactory } from './core/class/ComponentsFactory/Vue2ComponentsFactory';
import { Position } from './core/Position';

export default Newbie;

export const NewbiePlugin = {
    install(Vue) {
        Globals.componentsFactory = new Vue2ComponentsFactory(Vue);
    },
};

export const NewbiePosition = Position;
