import { VueHintFactory } from './core/model/Hint/HintFactory';
import { Newbie } from './core/model/Newbie';
import { Step } from './core/model/Step';

export default Newbie;

export const NewbiePlugin = {
  install(Vue) {
    Step.setHintFactory(new VueHintFactory({ Vue }));
  }
};
