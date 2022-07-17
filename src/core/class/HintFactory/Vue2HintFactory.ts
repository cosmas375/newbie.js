import {
    IHintFactory,
    IHint,
    IHintConfig,
    IHintSettings,
} from '../../Interfaces';
import { Vue2Hint } from '../Hint/Vue2Hint';

export class Vue2HintFactory implements IHintFactory {
    private _Vue: object;

    constructor(Vue: object) {
        this._Vue = Vue;
    }

    public create(config: IHintConfig, settings: IHintSettings): IHint {
        return new Vue2Hint(config, settings, this._Vue);
    }
}
