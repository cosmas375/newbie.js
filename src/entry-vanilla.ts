import { Newbie } from './core/class/Newbie';
import { ComponentsFactory } from './core/class/ComponentsFactory';
import { VanillaHintFactory } from './core/class/Hint/HintFactory';

import './assets/scss/hint.scss';
import './assets/scss/hint-wrap.scss';
import './assets/scss/shadow.scss';

declare global {
    interface Window {
        Newbie: any;
    }
}

ComponentsFactory.setHintFactory(new VanillaHintFactory());

window.Newbie = Newbie;
