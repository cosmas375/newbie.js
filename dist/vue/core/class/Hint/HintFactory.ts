import {
    IHintFactory,
    IHint,
    IHintConfig,
    IHintSettings,
} from '../../Interfaces';
import { VanillaHint } from './VanillaHint';
import { VueHint } from './VueHint';

export class VanillaHintFactory implements IHintFactory {
    public create(config: IHintConfig, settings: IHintSettings): IHint {
        return new VanillaHint(config, settings);
    }
}

export class VueHintFactory implements IHintFactory {
    private _vue: object;

    constructor(Vue: object) {
        this._vue = Vue;
    }

    public create(config: IHintConfig, settings: IHintSettings): IHint {
        return new VueHint(config, settings, this._vue);
    }
}
