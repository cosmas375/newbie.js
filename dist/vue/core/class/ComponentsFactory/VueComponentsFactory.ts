import {
    IHintFactory,
    IHint,
    IHintConfig,
    IHintSettings,
} from '../../Interfaces';
import { VueHintFactory } from '../Hint/HintFactory';
import { ComponentsFactory } from './ComponentsFactory';

export class VueComponentsFactory extends ComponentsFactory {
    private _Vue;
    private _hintFactory: IHintFactory;

    constructor(Vue: object) {
        super();
        this._Vue = Vue;
    }

    public createHint(config: IHintConfig, settings: IHintSettings): IHint {
        if (!this._hintFactory) {
            this._hintFactory = new VueHintFactory(this._Vue);
        }
        return this._hintFactory.create(config, settings);
    }
}
