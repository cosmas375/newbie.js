import {
    IHintFactory,
    IHint,
    IHintConfig,
    IHintSettings,
} from '../../Interfaces';
import { ReactHintFactory } from '../Hint/HintFactory';
import { ComponentsFactory } from './ComponentsFactory';

export class ReactComponentsFactory extends ComponentsFactory {
    private _ReactDOM: any;
    private _hintFactory: IHintFactory;

    constructor({ ReactDOM }) {
        super();
        this._ReactDOM = ReactDOM;
    }

    public createHint(config: IHintConfig, settings: IHintSettings): IHint {
        if (!this._hintFactory) {
            this._hintFactory = new ReactHintFactory({
                ReactDom: this._ReactDOM,
            });
        }
        return this._hintFactory.create(config, settings);
    }
}
