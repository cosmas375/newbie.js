import { DEFAULT_VALUES } from '../DefaultValues';
import { IConfig, INewbieConfig, IStepConfig } from '../Interfaces';
import { Position } from '../Position';
import { Error } from '../Error';
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
            return Error.NO_CONFIG_PROVIDED;
        }

        if (
            !Array.isArray(this._config.steps) ||
            (Array.isArray(this._config.steps) && !this._config.steps.length)
        ) {
            return Error.NO_STEPS_PROVIDED;
        }

        if (!this._config.hint && this._config.steps.some(step => !step.hint)) {
            return Error.NO_HINT_PROVIDED;
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
            return Error.NO_HINT_COMPONENT_PROVIDED;
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

        stepConfig.transitionDuration = this._resolve(
            config,
            stepConfig,
            'transitionDuration',
            DEFAULT_VALUES.transitionDuration
        );

        if (stepConfig.target) {
            stepConfig.position = this._resolve(
                config,
                stepConfig,
                'position',
                DEFAULT_VALUES.position
            );

            stepConfig.offsetX = this._resolve(
                config,
                stepConfig,
                'offsetX',
                DEFAULT_VALUES.offsetX
            );

            stepConfig.offsetY = this._resolve(
                config,
                stepConfig,
                'offsetY',
                DEFAULT_VALUES.offsetX
            );
        } else {
            stepConfig.position = Position.Center;
            stepConfig.offsetX = 0;
            stepConfig.offsetY = 0;

            stepConfig.arrow = { enabled: false };
        }

        // shadow
        const shadow = {
            ...config.shadow,
            ...stepConfig.shadow,
        };

        const defaultShadow = DEFAULT_VALUES.shadow;
        Object.keys(defaultShadow).forEach(key => {
            if (!isDefined(shadow[key])) {
                shadow[key] = defaultShadow[key];
            }
        });

        stepConfig.shadow = shadow;
        // end shadow

        // hint
        stepConfig.hint = this._resolve(config, stepConfig, 'hint');

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
        const arrow = {
            ...config.arrow,
            ...stepConfig.arrow,
        };

        const defaultArrow = DEFAULT_VALUES.arrow;
        Object.keys(defaultArrow).forEach(key => {
            if (!isDefined(arrow[key])) {
                arrow[key] = defaultArrow[key];
            }
        });

        stepConfig.arrow = arrow;
        // end arrow

        return stepConfig;
    }

    private _resolve(config, stepConfig, param, defaultValue?) {
        if (isDefined(stepConfig[param])) {
            return stepConfig[param];
        } else {
            return isDefined(config[param]) ? config[param] : defaultValue;
        }
    }
}
