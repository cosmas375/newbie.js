import { IShadow, IShadowConfig } from '../../Interfaces';

export class Shadow implements IShadow {
    protected _rootComponent;

    public mount(config) {
        this._rootComponent = config.rootComponent;
        this._disableScroll();
    }
    public unmount() {
        this._enableScroll();
    }

    private _disableScroll() {
        this._rootComponent.style.overflow = 'hidden';
    }
    private _enableScroll() {
        this._rootComponent.style.removeProperty('overflow');
    }
}
