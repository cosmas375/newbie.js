import {
    IHint,
    IHintFactory,
    THintConfig,
    THintSettings,
} from '../../Interfaces';
import { ReactHint } from '../Hint/ReactHint';

export class ReactHintFactory implements IHintFactory {
    private _ReactDOM: any;

    constructor({ ReactDOM }: { ReactDOM: any }) {
        this._ReactDOM = ReactDOM;
    }

    public create(config: THintConfig, settings: THintSettings): IHint {
        return new ReactHint(config, settings, this._ReactDOM);
    }
}
