import { IHintFactory, IHint } from '../../Interfaces';
import { VanillaHint } from './VanillaHint';
import { VueHint } from './VueHint';

export class VanillaHintFactory implements IHintFactory {
    public create(payload): IHint {
        return new VanillaHint(payload);
    }
}

export class VueHintFactory implements IHintFactory {
    private _vue;

    constructor({ Vue }) {
        this._vue = Vue;
    }

    public create(payload): IHint {
        return new VueHint(payload, { Vue: this._vue });
    }
}
