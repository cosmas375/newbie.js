import { IHint, THintConfig, THintSettings } from '../../Interfaces';
import { ReactHint } from '../Hint/ReactHint';
import { AbstractHintFactory } from './AbstractHintFactory';

export class ReactHintFactory extends AbstractHintFactory {
  private _ReactDOM: any;

  constructor({ ReactDOM }: { ReactDOM: any }) {
    super();

    this._ReactDOM = ReactDOM;
  }

  public create(config: THintConfig, settings: THintSettings): IHint {
    const hint = super.create(config, settings);

    if (hint) {
      return hint;
    }

    return new ReactHint(config, settings, this._ReactDOM);
  }
}
