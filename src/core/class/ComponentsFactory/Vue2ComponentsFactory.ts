import { IHint, THintConfig, THintSettings } from '../../Interfaces';
import { Vue2HintFactory } from '../HintFactory/Vue2HintFactory';
import { ComponentsFactory } from './ComponentsFactory';

export class Vue2ComponentsFactory extends ComponentsFactory {
  private _hintFactory: Vue2HintFactory;

  constructor(Vue: object) {
    super();
    this._hintFactory = new Vue2HintFactory(Vue);
  }

  public createHint(config: THintConfig, settings: THintSettings): IHint {
    return this._hintFactory.create(config, settings);
  }
}
