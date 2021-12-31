import { ShadowFactory } from '../Shadow/ShadowFactory';
import { ArrowFactory } from '../Arrow/ArrowFactory';
import { StepContainerFactory } from '../StepContainer/StepContainerFactory';
import { IComponentsFactory } from '../../Interfaces';

export class ComponentsFactory implements IComponentsFactory {
    constructor() {
        /* continue regardless of error */
    }

    public createHint(payload) {}

    public createShadow(payload) {
        return ShadowFactory.create(payload);
    }

    public createArrow(config) {
        return ArrowFactory.create(config);
    }

    public createStepContainer(payload) {
        return StepContainerFactory.create(payload);
    }
}
