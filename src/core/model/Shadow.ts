import { IShadowSettings } from "../helpers/Config";
import _throw from "../utils/throw";

export type TShadow = 'html';

export class Shadow {
  public static create(type: TShadow, settings: IShadowSettings): IShadow {
    switch (type) {
      case 'html':
        return new HtmlShadow(settings);
      default:
        return new NullShadow(settings);
    }
  }
}

export interface IShadow {
  mount(target: HTMLElement): void;
  unmount(): void;
};
class AbstractShadow implements IShadow {
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

class NullShadow extends AbstractShadow {
  constructor(settings: IShadowSettings) {
    super(settings);
  }

  public mount() { }

  public unmount() { }
}

class HtmlShadow extends AbstractShadow {
  private _wrap: HTMLElement;
  private _blockT: HTMLElement;
  private _blockR: HTMLElement;
  private _blockB: HTMLElement;
  private _blockL: HTMLElement;
  private _classNameHtml = 'newbie-html-shadow';
  private _blockClassName = `${this._classNameHtml}__block`;

  private _offset: number;

  constructor(settings: IShadowSettings) {
    super(settings);

    this._offset = settings.offset || 0;

    this._createElements();
  }

  public mount(target) {
    super.mount(target);

    this._update(target);
    this._show();
  }

  public unmount() {
    super.unmount();

    this._hide();
    this._removeElements();
  }


  private _createElements() {
    this._wrap = document.createElement('div');
    this._blockT = document.createElement('div');
    this._blockR = document.createElement('div');
    this._blockB = document.createElement('div');
    this._blockL = document.createElement('div');

    this._wrap.classList.add(this._className);
    this._wrap.classList.add(this._classNameHtml);
    this._blockT.classList.add(this._blockClassName, `${this._blockClassName}_top`);
    this._blockR.classList.add(this._blockClassName, `${this._blockClassName}_right`);
    this._blockB.classList.add(this._blockClassName, `${this._blockClassName}_bottom`);
    this._blockL.classList.add(this._blockClassName, `${this._blockClassName}_left`);

    this._wrap.append(this._blockT);
    this._wrap.append(this._blockR);
    this._wrap.append(this._blockB);
    this._wrap.append(this._blockL);

    this._rootComponent.append(this._wrap);
  }

  private _removeElements() {
    this._wrap.remove();
  }

  private _update(target) {
    const targetRect = target.getBoundingClientRect();

    this._blockT.style.height = `${targetRect.top - this._offset}px`;

    this._blockR.style.top = `${targetRect.top - this._offset}px`;
    this._blockR.style.left = `${targetRect.left + targetRect.width + this._offset}px`;
    this._blockR.style.width = `${window.innerWidth - (targetRect.left + targetRect.width + this._offset)}px`;
    this._blockR.style.height = `${targetRect.height + 2 * this._offset}px`;

    this._blockB.style.top = `${targetRect.top + targetRect.height + this._offset}px`;
    this._blockB.style.height = `${window.innerHeight - (targetRect.top + targetRect.height + this._offset)}px`;

    this._blockL.style.top = `${targetRect.top - this._offset}px`;
    this._blockL.style.width = `${targetRect.left - this._offset}px`;
    this._blockL.style.height = `${targetRect.height + 2 * this._offset}px`;
  }

  private _show() {
    this._wrap.classList.add(this._classNameVisible);
  }

  private _hide() {
    this._wrap.classList.remove(this._classNameVisible);
  }
}
