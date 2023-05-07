import { IShadow, TTargetElement, TValidShadowConfig } from '../../Interfaces';

export abstract class Shadow implements IShadow {
    protected _config: TValidShadowConfig | null = null;

    public mount(_: TTargetElement, config: TValidShadowConfig): void {
        this._config = config;

        if (this._config.disableScroll) {
            this._disableScroll();
        }
    }

    public unmount() {
        if (this._config?.disableScroll) {
            this._enableScroll();
        }
    }

    public reset() {}

    private _disableScroll() {
        if (this._config && this._config.rootComponent) {
            this._config.rootComponent.style.overflow = 'hidden';
        }
    }
    private _enableScroll() {
        if (this._config && this._config.rootComponent) {
            this._config.rootComponent.style.removeProperty('overflow');
        }
    }
}
