import {
    IArrow,
    IComponentsFactory,
    IHint,
    TArrowConfig,
    THintConfig,
    THintSettings,
    TShadowConfig,
} from '../../Interfaces';
import { ArrowFactory } from '../Arrow/ArrowFactory';
import { ShadowFactory } from '../Shadow/ShadowFactory';
import { StepContainerFactory } from '../StepContainer/StepContainerFactory';

export abstract class ComponentsFactory implements IComponentsFactory {
    constructor() {
        /* continue regardless of error */
    }

    abstract createHint(config: THintConfig, settings: THintSettings): IHint;

    public createShadow(config: TShadowConfig, settings: object) {
        return ShadowFactory.create(config, settings);
    }

    public createArrow(config: TArrowConfig): IArrow {
        return ArrowFactory.create(config);
    }

    public createStepContainer(payload: object) {
        return StepContainerFactory.create(payload);
    }
}
