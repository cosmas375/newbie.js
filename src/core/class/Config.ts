import { DEFAULT_VALUES } from '../DefaultValues';
import { Errors, IConfig, INewbieConfig, IStepConfig } from '../Interfaces';
import isDefined from '../utils/isDefined';

export class Config implements IConfig {
    private _config: INewbieConfig;

    constructor(config: INewbieConfig) {
        this._config = config;
    }

    get config(): INewbieConfig {
        return this._config;
    }

    public validate(): string | null {
        if (!this._config) {
            return Errors.NO_CONFIG_PROVIDED;
        }

        if (
            !Array.isArray(this._config.steps) ||
            (Array.isArray(this._config.steps) && !this._config.steps.length)
        ) {
            return Errors.NO_STEPS_PROVIDED;
        }

        if (this._config.steps.some(step => !step.target)) {
            return Errors.NO_STEP_TARGET_PROVIDED;
        }

        if (!this._config.hint && this._config.steps.some(step => !step.hint)) {
            return Errors.NO_HINT_PROVIDED;
        }

        if (
            (this._config.hint &&
                !this._config.hint.component &&
                this._config.steps.some(step => !step.hint)) ||
            (!this._config.hint &&
                this._config.steps.some(
                    step => step.hint && !step.hint.component
                ))
        ) {
            return Errors.NO_HINT_COMPONENT_PROVIDED;
        }

        return null;
    }

    public resolveStepConfig(stepId): IStepConfig {
        const stepConfig =
            typeof stepId === 'string'
                ? this._config.steps.find(step => step.id === stepId)
                : this._config.steps[stepId];
        const config = this._config;

        if (!isDefined(stepConfig.id)) {
            stepConfig.id = `No. ${stepId}`;
        }

        if (!isDefined(stepConfig.position)) {
            stepConfig.position = isDefined(config.position)
                ? config.position
                : DEFAULT_VALUES.POSITION;
        }

        if (!isDefined(stepConfig.transitionDuration)) {
            stepConfig.transitionDuration = isDefined(config.transitionDuration)
                ? config.transitionDuration
                : DEFAULT_VALUES.TRANSITION_DURATION;
        }

        if (!isDefined(stepConfig.offsetX)) {
            stepConfig.offsetX = isDefined(config.offsetX)
                ? config.offsetX
                : DEFAULT_VALUES.OFFSET_X;
        }

        if (!isDefined(stepConfig.offsetY)) {
            stepConfig.offsetY = isDefined(config.offsetY)
                ? config.offsetY
                : DEFAULT_VALUES.OFFSET_Y;
        }

        // shadow
        const commonShadowConfig = this._config.shadow || DEFAULT_VALUES.SHADOW;
        if (!isDefined(stepConfig.shadow)) {
            stepConfig.shadow = commonShadowConfig;
        }
        if (!isDefined(stepConfig.shadow.type)) {
            stepConfig.shadow.type =
                commonShadowConfig.type || DEFAULT_VALUES.SHADOW.type;
        }
        if (stepConfig.shadow.type === commonShadowConfig.type) {
            stepConfig.shadow = {
                ...commonShadowConfig,
                ...stepConfig.shadow,
            };
        }
        if (!isDefined(stepConfig.shadow.color)) {
            stepConfig.shadow.color = DEFAULT_VALUES.SHADOW_COLOR;
        }
        if (!isDefined(stepConfig.shadow.offset)) {
            stepConfig.shadow.offset = DEFAULT_VALUES.SHADOW_OFFSET;
        }
        if (!isDefined(stepConfig.shadow.borderRadius)) {
            stepConfig.shadow.borderRadius =
                DEFAULT_VALUES.SHADOW_BORDER_RADIUS;
        }
        if (!isDefined(stepConfig.shadow.rootComponent)) {
            stepConfig.shadow.rootComponent =
                DEFAULT_VALUES.SHADOW_ROOT_COMPONENT;
        }
        // end shadow

        // hint
        if (!isDefined(stepConfig.hint)) {
            stepConfig.hint = config.hint;
        }
        if (!isDefined(stepConfig.hint.component)) {
            stepConfig.hint.component = config.hint.component;
        }
        // end hint

        // content
        if (!isDefined(stepConfig.content)) {
            stepConfig.content = {};
        }
        // end content

        // arrow
        if (!isDefined(stepConfig.arrow)) {
            stepConfig.arrow = isDefined(config.arrow)
                ? config.arrow
                : {
                      type: null,
                  };
        }
        if (!isDefined(stepConfig.arrow.size)) {
            stepConfig.arrow.size =
                isDefined(config.arrow) && isDefined(config.arrow.size)
                    ? config.arrow.size
                    : DEFAULT_VALUES.ARROW_SIZE;
        }
        if (!isDefined(stepConfig.arrow.color)) {
            stepConfig.arrow.color =
                isDefined(config.arrow) && isDefined(config.arrow.color)
                    ? config.arrow.color
                    : DEFAULT_VALUES.ARROW_COLOR;
        }
        if (!isDefined(stepConfig.arrow.offsetX)) {
            stepConfig.arrow.offsetX =
                isDefined(config.arrow) && isDefined(config.arrow.offsetX)
                    ? config.arrow.offsetX
                    : DEFAULT_VALUES.ARROW_OFFSET;
        }
        if (!isDefined(stepConfig.arrow.offsetY)) {
            stepConfig.arrow.offsetY =
                isDefined(config.arrow) && isDefined(config.arrow.offsetY)
                    ? config.arrow.offsetY
                    : DEFAULT_VALUES.ARROW_OFFSET;
        }
        // if (!isDefined(stepConfig.arrow.position)) {
        //     stepConfig.arrow.position = stepConfig.position || DEFAULT_VALUES.POSITION;
        // }
        // stepConfig.arrow.size =
        //     stepConfig.arrow.size || config.position || DEFAULT_VALUES.POSITION;
        // end arrow

        return stepConfig;
    }
}
