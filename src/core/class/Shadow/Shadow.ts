import { IShadow, IShadowConfig } from '../../Interfaces';

export class Shadow implements IShadow {
    protected _config: IShadowConfig;

    public mount(targetElement, config) {
        this._config = config;

        if (this._config.disableScroll) {
            this._disableScroll();
        }
    }

    public unmount() {
        if (this._config.disableScroll) {
            this._enableScroll();
        }
    }

    public reset() {}

    private _disableScroll() {
        this._config.rootComponent.style.overflow = 'hidden';
    }
    private _enableScroll() {
        this._config.rootComponent.style.removeProperty('overflow');
    }
}
