import { Newbie } from './core/class/Newbie';
import { Step } from './core/class/Step';
import { VanillaHintFactory } from './core/class/Hint/HintFactory';

import './assets/scss/hint.scss';
import './assets/scss/shadow.scss';

declare global {
    interface Window {
        Newbie: any;
    }
}

Step.setHintFactory(new VanillaHintFactory());

window.Newbie = Newbie;
