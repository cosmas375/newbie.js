import { VueHintFactory } from './core/class/Hint/HintFactory';
import { Newbie } from './core/class/Newbie';
import { Step } from './core/class/Step';

export default Newbie;

export const NewbiePlugin = {
  install(Vue) {
    Step.setHintFactory(new VueHintFactory({ Vue }));
  }
};
