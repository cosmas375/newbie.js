import { IHint, THintConfig, THintSettings } from '../../Interfaces';
import { Vue3Hint } from '../Hint/Vue3Hint';
import { AbstractHintFactory } from './AbstractHintFactory';

export class Vue3HintFactory extends AbstractHintFactory {
  private _createApp: any;

  constructor({ createApp }: { createApp: any }) {
    super();

    this._createApp = createApp;
  }

  public create(config: THintConfig, settings: THintSettings): IHint {
    const hint = super.create(config, settings);

    if (hint) {
      return hint;
    }

    return new Vue3Hint(config, settings, this._createApp);
  }
}
