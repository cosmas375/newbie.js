import { AbstractShadow } from './AbstractShadow';

export class HtmlShadow extends AbstractShadow {
  private _blockT: HTMLElement;
  private _blockR: HTMLElement;
  private _blockB: HTMLElement;
  private _blockL: HTMLElement;
  private _classNameHtml: string = 'newbie-html-shadow';
  private _blockClassName: string = `${this._classNameHtml}__block`;

  private _offset: number;

  constructor(settings) {
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
