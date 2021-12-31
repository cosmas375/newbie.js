import { Newbie } from './core/class/Newbie';
import { Globals } from './core/class/Globals';
import { VanillaComponentsFactory } from './core/class/ComponentsFactory/VanillaComponentsFactory';

import './assets/scss/hint.scss';
import './assets/scss/hint-wrap.scss';
import './assets/scss/shadow.scss';

declare global {
    interface Window {
        Newbie: any;
    }
}

Globals.componentsFactory = new VanillaComponentsFactory();

window.Newbie = Newbie;
