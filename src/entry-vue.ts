import { VueHintFactory } from './core/class/Hint/HintFactory';
import { Newbie } from './core/class/Newbie';
import { ComponentsFactory } from './core/class/ComponentsFactory';

export default Newbie;

export const NewbiePlugin = {
    install(Vue) {
        ComponentsFactory.setHintFactory(new VueHintFactory({ Vue }));
    },
};
