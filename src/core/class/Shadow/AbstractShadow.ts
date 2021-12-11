
import { IShadow, IShadowSettings } from "../../Interfaces";

export class AbstractShadow implements IShadow {
  protected _rootComponent;

  constructor(settings: IShadowSettings) {
    this._rootComponent = settings.rootComponent || document.documentElement;
  }

  public mount(target) {
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
