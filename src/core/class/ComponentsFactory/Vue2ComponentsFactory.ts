import {
    IHintFactory,
    IHint,
    IHintConfig,
    IHintSettings,
} from '../../Interfaces';
import { Vue2HintFactory } from '../HintFactory/Vue2HintFactory';
import { ComponentsFactory } from './ComponentsFactory';

export class Vue2ComponentsFactory extends ComponentsFactory {
    private _Vue;
    private _hintFactory: IHintFactory;

    constructor(Vue: object) {
        super();
        this._Vue = Vue;
    }

    public createHint(config: IHintConfig, settings: IHintSettings): IHint {
        if (!this._hintFactory) {
            this._hintFactory = new Vue2HintFactory(this._Vue);
        }
        return this._hintFactory.create(config, settings);
    }
}
