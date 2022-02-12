import { Newbie } from './core/class/Newbie';
import { Globals } from './core/class/Globals';
import { VueComponentsFactory } from './core/class/ComponentsFactory/VueComponentsFactory';

export default Newbie;

export const NewbiePlugin = {
    install(Vue) {
        Globals.componentsFactory = new VueComponentsFactory(Vue);
    },
};
