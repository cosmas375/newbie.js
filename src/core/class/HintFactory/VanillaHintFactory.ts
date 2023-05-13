import {
    IHint,
    IHintFactory,
    THintConfig,
    THintSettings,
} from '../../Interfaces';
import { VanillaHint } from '../Hint/VanillaHint';

export class VanillaHintFactory implements IHintFactory {
    public create(config: THintConfig, settings: THintSettings): IHint {
        return new VanillaHint(config, settings);
    }
}
