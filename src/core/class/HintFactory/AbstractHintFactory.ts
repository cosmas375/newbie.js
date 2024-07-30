import { IHint, THintConfig, THintSettings } from '../../Interfaces';
import { VanillaHint } from '../Hint/VanillaHint';

export abstract class AbstractHintFactory {
  public create(config: THintConfig, settings: THintSettings): IHint | null {
    if (!(config.component instanceof HTMLElement)) {
      return null;
    }

    return new VanillaHint(config, settings);
  }
}
