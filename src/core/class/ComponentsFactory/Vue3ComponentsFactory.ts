import {
    IHintFactory,
    IHint,
    IHintConfig,
    IHintSettings,
} from '../../Interfaces';
import { Vue3HintFactory } from '../Hint/HintFactory';
import { ComponentsFactory } from './ComponentsFactory';

export class Vue3ComponentsFactory extends ComponentsFactory {
    private _createApp;
    private _hintFactory: IHintFactory;

    constructor({ createApp }) {
        super();
        this._createApp = createApp;
    }

    public createHint(config: IHintConfig, settings: IHintSettings): IHint {
        if (!this._hintFactory) {
            this._hintFactory = new Vue3HintFactory({
                createApp: this._createApp,
            });
        }
        return this._hintFactory.create(config, settings);
    }
}
