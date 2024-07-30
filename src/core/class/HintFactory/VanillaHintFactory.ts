import { IHint, THintConfig, THintSettings } from '../../Interfaces';
import { VanillaHint } from '../Hint/VanillaHint';
import { AbstractHintFactory } from './AbstractHintFactory';

export class VanillaHintFactory extends AbstractHintFactory {
  public create(config: THintConfig, settings: THintSettings): IHint {
    const hint = super.create(config, settings);

    if (hint) {
      return hint;
    }

    return new VanillaHint(config, settings);
  }
}
