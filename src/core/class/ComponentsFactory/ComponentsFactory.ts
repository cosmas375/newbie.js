import { ShadowFactory } from '../Shadow/ShadowFactory';
import { ArrowFactory } from '../Arrow/ArrowFactory';
import { StepContainerFactory } from '../StepContainer/StepContainerFactory';
import {
    IArrow,
    IArrowConfig,
    IComponentsFactory,
    IHint,
    IHintConfig,
    IHintSettings,
    IShadowConfig,
} from '../../Interfaces';

export abstract class ComponentsFactory implements IComponentsFactory {
    constructor() {
        /* continue regardless of error */
    }

    abstract createHint(config: IHintConfig, settings: IHintSettings): IHint;

    public createShadow(config: IShadowConfig, settings: object) {
        return ShadowFactory.create(config, settings);
    }

    public createArrow(config: IArrowConfig): IArrow {
        return ArrowFactory.create(config);
    }

    public createStepContainer(payload: object) {
        return StepContainerFactory.create(payload);
    }
}
