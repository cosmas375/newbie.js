import { IHint, THintConfig, THintSettings } from '../../Interfaces';
import { VanillaHintFactory } from '../HintFactory/VanillaHintFactory';
import { ComponentsFactory } from './ComponentsFactory';

export class VanillaComponentsFactory extends ComponentsFactory {
  private _hintFactory: VanillaHintFactory;

  constructor() {
    super();
    this._hintFactory = new VanillaHintFactory();
  }

  public createHint(config: THintConfig, settings: THintSettings): IHint {
    return this._hintFactory.create(config, settings);
  }
}
