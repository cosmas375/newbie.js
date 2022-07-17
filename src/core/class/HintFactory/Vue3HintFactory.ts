import {
    IHintFactory,
    IHint,
    IHintConfig,
    IHintSettings,
} from '../../Interfaces';
import { Vue3Hint } from '../Hint/Vue3Hint';

export class Vue3HintFactory implements IHintFactory {
    private _createApp: any;

    constructor({ createApp }) {
        this._createApp = createApp;
    }

    public create(config: IHintConfig, settings: IHintSettings): IHint {
        return new Vue3Hint(config, settings, this._createApp);
    }
}
