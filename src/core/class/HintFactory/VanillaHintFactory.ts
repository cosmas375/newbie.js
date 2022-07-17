import {
    IHintFactory,
    IHint,
    IHintConfig,
    IHintSettings,
} from '../../Interfaces';
import { VanillaHint } from '../Hint/VanillaHint';

export class VanillaHintFactory implements IHintFactory {
    public create(config: IHintConfig, settings: IHintSettings): IHint {
        return new VanillaHint(config, settings);
    }
}
