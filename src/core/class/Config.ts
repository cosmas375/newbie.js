import { Errors, IConfig, INewbieConfig } from '../Interfaces';

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

        // shadow
        if (!stepConfig.shadow) {
            stepConfig.shadow = config.shadow || { type: null };
        }
        if (typeof stepConfig.shadow.type === 'undefined') {
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
        if (
            typeof stepConfig.hint.component === 'undefined' &&
            config.hint.component
        ) {
            stepConfig.hint.component = config.hint.component;
        }
        if (
            typeof stepConfig.hint.position === 'undefined' &&
            config.hint.position
        ) {
            stepConfig.hint.position = config.hint.position;
        }
        // end hint

        return stepConfig;
    }
}
