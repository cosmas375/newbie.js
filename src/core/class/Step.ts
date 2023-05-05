import {
    IStep,
    THintSettings,
    TStepId,
    TTargetElement,
    TValidStepConfig,
} from '../Interfaces';
import getCallback from '../utils/getCallback';
import { StepView } from './StepView';

export class Step implements IStep {
    private _config: TValidStepConfig;
    private _lifecycleHooks;
    private _view: StepView;
    private _targetElement: TTargetElement = null;

    constructor(config: TValidStepConfig, hintSettings: THintSettings) {
        this._view = new StepView(config, hintSettings);
        this._config = config;
        this._lifecycleHooks = this._getLifecycleHooks();
    }

    public getId(): TStepId {
        return this._config.id;
    }

    public async mount(): Promise<void> {
        await this._lifecycleHooks.beforeMount();
        this._targetElement = await this._view.mount();
        await this._lifecycleHooks.mounted(this._targetElement);
    }

    public async unmount(): Promise<void> {
        await this._lifecycleHooks.beforeUnmount(this._targetElement);
        await this._view.unmount();
        await this._lifecycleHooks.unmounted();
    }

    public reset(): void {
        this._view.reset();
    }

    private _getLifecycleHooks() {
        return {
            beforeMount: getCallback(this._config.beforeMount),
            mounted: getCallback(this._config.mounted),
            beforeUnmount: getCallback(this._config.beforeUnmount),
            unmounted: getCallback(this._config.unmounted),
        };
    }
}
