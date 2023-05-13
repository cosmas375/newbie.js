import {
    IHint,
    IHintFactory,
    THintConfig,
    THintSettings,
} from '../../Interfaces';
import { Vue3HintFactory } from '../HintFactory/Vue3HintFactory';
import { ComponentsFactory } from './ComponentsFactory';

export class Vue3ComponentsFactory extends ComponentsFactory {
    private _hintFactory: IHintFactory;

    constructor({ createApp }: { createApp: any }) {
        super();
        this._hintFactory = new Vue3HintFactory({
            createApp,
        });
    }

    public createHint(config: THintConfig, settings: THintSettings): IHint {
        return this._hintFactory.create(config, settings);
    }
}
