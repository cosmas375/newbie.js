import {
    IHintFactory,
    IHint,
    IHintConfig,
    IHintSettings,
} from '../../Interfaces';
import { ReactHint } from '../Hint/ReactHint';

export class ReactHintFactory implements IHintFactory {
    private _ReactDOM: any;

    constructor({ ReactDom }) {
        this._ReactDOM = ReactDom;
    }

    public create(config: IHintConfig, settings: IHintSettings): IHint {
        return new ReactHint(config, settings, this._ReactDOM);
    }
}
