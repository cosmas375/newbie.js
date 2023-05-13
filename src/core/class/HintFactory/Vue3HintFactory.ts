import {
    IHint,
    IHintFactory,
    THintConfig,
    THintSettings,
} from '../../Interfaces';
import { Vue3Hint } from '../Hint/Vue3Hint';

export class Vue3HintFactory implements IHintFactory {
    private _createApp: any;

    constructor({ createApp }: { createApp: any }) {
        this._createApp = createApp;
    }

    public create(config: THintConfig, settings: THintSettings): IHint {
        return new Vue3Hint(config, settings, this._createApp);
    }
}
