import {
    IHint,
    IHintFactory,
    THintConfig,
    THintSettings,
} from '../../Interfaces';
import { Vue2Hint } from '../Hint/Vue2Hint';

export class Vue2HintFactory implements IHintFactory {
    private _Vue: object;

    constructor(Vue: object) {
        this._Vue = Vue;
    }

    public create(config: THintConfig, settings: THintSettings): IHint {
        return new Vue2Hint(config, settings, this._Vue);
    }
}
