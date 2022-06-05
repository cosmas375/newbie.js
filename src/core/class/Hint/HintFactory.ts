import {
    IHintFactory,
    IHint,
    IHintConfig,
    IHintSettings,
} from '../../Interfaces';
import { VanillaHint } from './VanillaHint';
import { Vue2Hint } from './Vue2Hint';

export class VanillaHintFactory implements IHintFactory {
    public create(config: IHintConfig, settings: IHintSettings): IHint {
        return new VanillaHint(config, settings);
    }
}

export class Vue2HintFactory implements IHintFactory {
    private _Vue: object;

    constructor(Vue: object) {
        this._Vue = Vue;
    }

    public create(config: IHintConfig, settings: IHintSettings): IHint {
        return new Vue2Hint(config, settings, this._Vue);
    }
}
