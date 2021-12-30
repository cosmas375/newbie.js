import { IHintFactory } from '../Interfaces';
import { ShadowFactory } from './Shadow/ShadowFactory';
import { ArrowFactory } from './Arrow/ArrowFactory';
import { StepContainer } from './StepContainer';

export class ComponentsFactory {
    private static _stepContainer: StepContainer;
    private static _hintFactory: IHintFactory;

    static setHintFactory(factory) {
        this._hintFactory = factory;
    }
    static createHint(config) {
        return this._hintFactory.create(config);
    }

    static createShadow(config) {
        return ShadowFactory.create(config);
    }

    static createArrow(config) {
        return ArrowFactory.create(config);
    }

    static createStepContainer(config) {
        if (!this._stepContainer) {
            this._stepContainer = new StepContainer(config);
        }
        return this._stepContainer;
    }
}
