import { IHintFactory, IHint } from '../../Interfaces';
import { VanillaHint } from './VanillaHint';
import { VueHint } from './VueHint';

export class VanillaHintFactory implements IHintFactory {
    public create(config): IHint {
        return new VanillaHint(config);
    }
}

export class VueHintFactory implements IHintFactory {
    private _vue;

    constructor({ Vue }) {
        this._vue = Vue;
    }

    public create(config): IHint {
        return new VueHint(config, { Vue: this._vue });
    }
}
