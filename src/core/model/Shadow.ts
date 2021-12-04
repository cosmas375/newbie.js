import { IShadowSettings } from "../helpers/Config";
import _throw from "../utils/throw";

export class Shadow {
  public static TYPE_HTML = 'html';
  public static TYPE_SVG = 'svg';

  public static create(type, settings: IShadowSettings): IShadow {
    switch (type) {
      case this.TYPE_HTML:
        return new HtmlShadow(settings);
      case this.TYPE_SVG:
        return new SvgShadow(settings);
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
  private _blockT: HTMLElement;
  private _blockR: HTMLElement;
  private _blockB: HTMLElement;
  private _blockL: HTMLElement;
  private _classNameHtml: string = 'newbie-html-shadow';
  private _blockClassName: string = `${this._classNameHtml}__block`;

  private _offset: number;

  constructor(settings: IShadowSettings) {
    super(settings);

    this._offset = settings.offset || 0;
  }

  public mount(target) {
    super.mount(target);

    this._createElements();
    this._update(target);
    this._show();
  }

  public unmount() {
    super.unmount();

    this._hide();
    this._removeElements();
  }


  private _createElements() {
    this._blockT = document.createElement('div');
    this._blockR = document.createElement('div');
    this._blockB = document.createElement('div');
    this._blockL = document.createElement('div');

    this._blockT.classList.add(this._className, this._blockClassName, `${this._blockClassName}_top`);
    this._blockR.classList.add(this._className, this._blockClassName, `${this._blockClassName}_right`);
    this._blockB.classList.add(this._className, this._blockClassName, `${this._blockClassName}_bottom`);
    this._blockL.classList.add(this._className, this._blockClassName, `${this._blockClassName}_left`);

    this._rootComponent.append(this._blockT);
    this._rootComponent.append(this._blockR);
    this._rootComponent.append(this._blockB);
    this._rootComponent.append(this._blockL);
  }

  private _removeElements() {
    this._blockT.remove();
    this._blockR.remove();
    this._blockB.remove();
    this._blockL.remove();
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
    this._blockT.classList.add(this._classNameVisible);
    this._blockR.classList.add(this._classNameVisible);
    this._blockB.classList.add(this._classNameVisible);
    this._blockL.classList.add(this._classNameVisible);
  }

  private _hide() {
    this._blockT.classList.remove(this._classNameVisible);
    this._blockR.classList.remove(this._classNameVisible);
    this._blockB.classList.remove(this._classNameVisible);
    this._blockL.classList.remove(this._classNameVisible);
  }
}


class SvgShadow extends AbstractShadow {
  private _block: HTMLElement;
  private _svg: HTMLElement;
  private _classNameSvg: string = 'newbie-svg-shadow';
  private _maskId: string = 'svg_shadow_mask';

  private _offset: number;
  private _borderRadius: number;

  constructor(settings) {
    super(settings);

    this._offset = settings.offset || 0;
    this._borderRadius = settings.borderRadius || 0;
  }

  public mount(target) {
    super.mount(target);

    this._createElements();
    this._update(target);
    this._show();
  }

  public unmount() {
    super.unmount();

    this._hide();
    this._removeElements();
  }

  private _createElements() {
    this._block = document.createElement('div');
    this._block.classList.add(this._className, this._classNameSvg);

    this._svg = document.createElement('svg');
    this._svg.setAttribute('width', String(window.innerWidth));
    this._svg.setAttribute('height', String(window.innerHeight));
    this._svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);

    const shadow = document.createElement('rect');
    shadow.setAttribute('width', String(window.innerWidth));
    shadow.setAttribute('height', String(window.innerHeight));
    shadow.setAttribute('fill', 'rgba(0,0,0,.3)');
    shadow.setAttribute('mask', `url(#${this._maskId})`);

    this._svg.append(shadow);
    this._block.append(this._svg);
    this._rootComponent.append(this._block);
  }

  private _removeElements() {
    this._block.remove();
  }

  private _update(target) {
    const targetRect = target.getBoundingClientRect();

    const defs = document.createElement('defs');
    const mask = document.createElement('mask');
    mask.setAttribute('id', this._maskId);

    const white = document.createElement('rect');
    white.setAttribute('x', '0');
    white.setAttribute('y', '0');
    white.setAttribute('width', String(window.innerWidth));
    white.setAttribute('height', String(window.innerHeight));
    white.setAttribute('fill', '#ffffff');

    const black = document.createElement('rect');
    black.setAttribute('x', String(targetRect.left - this._offset));
    black.setAttribute('y', String(targetRect.top - this._offset));
    black.setAttribute('width', String(targetRect.width + 2 * this._offset));
    black.setAttribute('height', String(targetRect.height + 2 * this._offset));
    black.setAttribute('rx', String(this._borderRadius));
    black.setAttribute('ry', String(this._borderRadius));
    black.setAttribute('fill', '#000000');

    mask.append(white);
    mask.append(black);
    defs.append(mask);
    this._svg.append(defs);
  }

  private _show() {
    this._block.classList.add(this._classNameVisible);

    // force rerender svg
    this._block.innerHTML += '';
  }

  private _hide() {
    this._block.classList.remove(this._classNameVisible);
  }
}
