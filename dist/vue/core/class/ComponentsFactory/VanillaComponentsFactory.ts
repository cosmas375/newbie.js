import { IHintConfig, IHintFactory, IHintSettings } from '../../Interfaces';
import { VanillaHintFactory } from '../Hint/HintFactory';
import { ComponentsFactory } from './ComponentsFactory';

export class VanillaComponentsFactory extends ComponentsFactory {
    private _hintFactory: IHintFactory;

    public createHint(config: IHintConfig, settings: IHintSettings) {
        if (!this._hintFactory) {
            this._hintFactory = new VanillaHintFactory();
        }
        return this._hintFactory.create(config, settings);
    }
}
