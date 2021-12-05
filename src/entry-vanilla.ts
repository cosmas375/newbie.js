import { Newbie } from './core/model/Newbie';
import { Step } from './core/model/Step';
import { VanillaHintFactory } from './core/model/Hint/HintFactory';

import './assets/scss/hint.scss';
import './assets/scss/shadow.scss';

declare global {
  interface Window {
    Newbie: any;
  }
}

Step.setHintFactory(new VanillaHintFactory());

window.Newbie = Newbie;
