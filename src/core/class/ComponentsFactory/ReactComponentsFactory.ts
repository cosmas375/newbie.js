import {
    IHint,
    IHintFactory,
    THintConfig,
    THintSettings,
} from '../../Interfaces';
import { ReactHintFactory } from '../HintFactory/ReactHintFactory';
import { ComponentsFactory } from './ComponentsFactory';

export class ReactComponentsFactory extends ComponentsFactory {
    private _hintFactory: IHintFactory;

    constructor({ ReactDOM }: { ReactDOM: any }) {
        super();
        this._hintFactory = new ReactHintFactory({
            ReactDOM,
        });
    }

    public createHint(config: THintConfig, settings: THintSettings): IHint {
        return this._hintFactory.create(config, settings);
    }
}
