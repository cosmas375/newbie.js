import { Newbie } from './core/class/Newbie';
import { Globals } from './core/class/Globals';
import { Vue3ComponentsFactory } from './core/class/ComponentsFactory/Vue3ComponentsFactory';

export default Newbie;

export const NewbiePlugin = {
    install(app, { createApp }) {
        Globals.componentsFactory = new Vue3ComponentsFactory({ createApp });
    },
};
