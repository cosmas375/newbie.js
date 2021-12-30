import { DEFAULT_VALUES } from '../DefaultValues';
import { Errors, IConfig, INewbieConfig, Position } from '../Interfaces';
import isDefined from '../utils/isDefined';

export class Config implements IConfig {
    private _config: INewbieConfig;

    constructor(config: INewbieConfig) {
        this._config = config;
    }

    validate() {
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

    resolveStepConfig(stepId) {
        const stepConfig =
            typeof stepId === 'string'
                ? this._config.steps.find(step => step.id === stepId)
                : this._config.steps[stepId];
        const config = this._config;

        if (!stepConfig.id) {
            stepConfig.id = `No. ${stepId}`;
        }

        if (!isDefined(stepConfig.position) && config.position) {
            stepConfig.position = config.position;
        }

        if (!isDefined(stepConfig.transitionDuration)) {
            stepConfig.transitionDuration = isDefined(config.transitionDuration)
                ? config.transitionDuration
                : DEFAULT_VALUES.transitionDuration;
        }

        // shadow
        if (!stepConfig.shadow) {
            stepConfig.shadow = config.shadow || { type: null };
        }
        if (!isDefined(stepConfig.shadow.type)) {
            stepConfig.shadow.type = config.shadow.type;
        }
        if (
            !stepConfig.shadow &&
            config.shadow.type === stepConfig.shadow.type
        ) {
            stepConfig.shadow = config.shadow;
        }
        if (!stepConfig.shadow) {
            stepConfig.shadow = {};
        }
        // end shadow

        // hint
        if (!stepConfig.hint) {
            stepConfig.hint = config.hint || { component: null };
        }
        if (!isDefined(stepConfig.hint.component) && config.hint.component) {
            stepConfig.hint.component = config.hint.component;
        }
        // end hint

        // content
        if (!stepConfig.content) {
            stepConfig.content = {};
        }
        // end content

        // arrow
        if (!stepConfig.arrow) {
            stepConfig.arrow = config.arrow || {
                type: null,
                position: Position.Bottom,
            };
        }
        stepConfig.arrow.position =
            stepConfig.position || config.position || Position.Bottom;
        // end arrow

        return stepConfig;
    }
}
