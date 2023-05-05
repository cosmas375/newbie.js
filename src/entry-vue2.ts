import { Vue2ComponentsFactory } from './core/class/ComponentsFactory/Vue2ComponentsFactory';
import { Globals } from './core/class/Globals';
import { Newbie } from './core/class/Newbie';
import { Position } from './core/Position';

export default Newbie;

export const NewbiePlugin = {
    install(Vue: any) {
        Globals.componentsFactory = new Vue2ComponentsFactory(Vue);
    },
};

export const NewbiePosition = Position;
