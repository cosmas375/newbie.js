import { DEFAULT_VALUES } from '../DefaultValues';
import { Error } from '../Error';
import {
    IConfig,
    TCommonUserConfig,
    TNewbieConfig,
    TStepConfig,
    TStepId,
    TValidNewbieConfig,
    TValidStepConfig,
} from '../Interfaces';
import { Position } from '../Position';
import { assertIsDefined } from '../utils/isDefined';
import _throw from '../utils/throw';

export class Config implements IConfig {
    private _config: TNewbieConfig;

    constructor(config: TNewbieConfig) {
        this._config = config;
    }

    public getConfig(): TValidNewbieConfig {
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

    public getStepConfig(stepId: TStepId): TValidStepConfig {
        const stepConfig = this._config.steps.find(step => step.id === stepId);

        assertIsDefined(stepConfig);

        const config = this._config;

        if (!stepConfig.id) {
            stepConfig.id = `No. ${stepId}`;
        }

        stepConfig.transitionDuration = this._resolve(
            config,
            stepConfig,
            'transitionDuration'
        );

        if (stepConfig.target) {
            stepConfig.position = this._resolve(config, stepConfig, 'position');
            stepConfig.offsetX = this._resolve(config, stepConfig, 'offsetX');
            stepConfig.offsetY = this._resolve(config, stepConfig, 'offsetY');
            stepConfig.arrow = this._resolve(config, stepConfig, 'arrow');
        } else {
            stepConfig.position = Position.Center;
            stepConfig.offsetX = 0;
            stepConfig.offsetY = 0;
            stepConfig.arrow = {
                enabled: false,
                padding: 0,
            };
        }

        stepConfig.shadow = this._resolve(config, stepConfig, 'shadow');
        stepConfig.hint = this._resolve(config, stepConfig, 'hint');

        if (!stepConfig.content) {
            stepConfig.content = {};
        }

        return stepConfig;
    }

    private _resolve<T extends keyof TCommonUserConfig>(
        newbieConfig: TNewbieConfig,
        stepConfig: TStepConfig,
        param: T
    ): TValidStepConfig[T] {
        const newbieConfigValue = newbieConfig[param];
        const stepConfigValue = stepConfig[param];
        // @ts-ignore
        const defaultValue = DEFAULT_VALUES[param];

        if (typeof defaultValue === 'object') {
            const result = Object.assign(
                {},
                defaultValue,
                newbieConfigValue,
                stepConfigValue
            );
            return result;
        } else {
            const value = stepConfigValue || newbieConfigValue || defaultValue;
            return value;
        }
    }
}
