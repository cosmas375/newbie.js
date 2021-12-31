import { IHintFactory } from '../../Interfaces';
import { VueHintFactory } from '../Hint/HintFactory';
import { ComponentsFactory } from './ComponentsFactory';

export class VueComponentsFactory extends ComponentsFactory {
    private _Vue;
    private _hintFactory: IHintFactory;

    constructor(Vue) {
        super();
        this._Vue = Vue;
    }

    public createHint(payload) {
        if (!this._hintFactory) {
            this._hintFactory = new VueHintFactory({ Vue: this._Vue });
        }
        return this._hintFactory.create(payload);
    }
}
