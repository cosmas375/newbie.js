import {
    IHintFactory,
    IHint,
    IHintConfig,
    IHintSettings,
} from '../../Interfaces';
import { VanillaHint } from './VanillaHint';
import { Vue2Hint } from './Vue2Hint';
import { Vue3Hint } from './Vue3Hint';

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

export class Vue3HintFactory implements IHintFactory {
    private _createApp: any;

    constructor({ createApp }) {
        this._createApp = createApp;
    }

    public create(config: IHintConfig, settings: IHintSettings): IHint {
        return new Vue3Hint(config, settings, this._createApp);
    }
}
