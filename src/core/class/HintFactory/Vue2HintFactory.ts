import { IHint, THintConfig, THintSettings } from '../../Interfaces';
import { Vue2Hint } from '../Hint/Vue2Hint';
import { AbstractHintFactory } from './AbstractHintFactory';

export class Vue2HintFactory extends AbstractHintFactory {
  private _Vue: object;

  constructor(Vue: object) {
    super();

    this._Vue = Vue;
  }

  public create(config: THintConfig, settings: THintSettings): IHint {
    const hint = super.create(config, settings);

    if (hint) {
      return hint;
    }

    return new Vue2Hint(config, settings, this._Vue);
  }
}
