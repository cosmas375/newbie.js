
import { IShadow } from "./ShadowFactory";
import { IShadowSettings } from "../Config";

export class AbstractShadow implements IShadow {
  protected _rootComponent;
  protected _className = 'newbie-shadow';
  protected _classNameVisible = `${this._className}_visible`;

  constructor(settings: IShadowSettings) {
    this._rootComponent = settings.rootComponent || document.documentElement;
  }

  public mount(target) {
    this._preventScroll();
  }
  public unmount() {
    this._rootComponent.style.removeProperty('overflow');
  }

  private _preventScroll() {
    this._rootComponent.style.overflow = 'hidden';
  }
}
