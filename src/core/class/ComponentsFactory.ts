import { IHintFactory } from '../Interfaces';
import { ShadowFactory } from './Shadow/ShadowFactory';
import { ArrowFactory } from './Arrow/ArrowFactory';
import { StepContainer } from './StepContainer';
import _throw from '../utils/throw';

export class ComponentsFactory {
    protected static _hintFactory: IHintFactory;

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

    static createStepContainer(params) {
        return new StepContainer(params);
    }
}