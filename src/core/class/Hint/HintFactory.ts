import {
    IHintFactory,
    IHint,
    IHintConfig,
    IHintSettings,
} from '../../Interfaces';
import { ReactHint } from './ReactHint';
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

export class ReactHintFactory implements IHintFactory {
    private _ReactDOM: any;

    constructor({ ReactDom }) {
        this._ReactDOM = ReactDom;
    }

    public create(config: IHintConfig, settings: IHintSettings): IHint {
        return new ReactHint(config, settings, this._ReactDOM);
    }
}
