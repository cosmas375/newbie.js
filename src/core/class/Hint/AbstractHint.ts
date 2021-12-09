import { IHint, Position } from "../../Interfaces";

export class AbstractHint implements IHint {
  private _position;
  private _targetElement;
  private _hintWrap;
  private _slotForHint;

  constructor(settings) {
    this._position = settings.position || Position.Top;
  }

  public mount(targetElement) {
    this._targetElement = targetElement;
    this._mountWrapComponent();
  }

  public unmount() {
    this._hintWrap.remove();
  }

  public setContent() {
  }

  private _mountWrapComponent() {
    const wrap = document.createElement('div');
    wrap.classList.add('newbie-hint-wrap');
    const inner = document.createElement('div');
    inner.classList.add('newbie-hint-wrap__inner');
    wrap.append(inner);

    const targetRect = this._targetElement.getBoundingClientRect();
    const offsetY = 10;
    const offsetX = 10;

    switch (this._position) {
      case Position.Top:
      default:
        wrap.style.top = `${document.documentElement.scrollTop + targetRect.top - offsetY}px`;
        wrap.style.left = `${targetRect.left + targetRect.width / 2}px`;
        wrap.style.alignItems = 'center';
        wrap.style.justifyContent = 'center';
        inner.style.bottom = '0px';
        break;
      case Position.TopLeft:
        wrap.style.top = `${document.documentElement.scrollTop + targetRect.top - offsetY}px`;
        wrap.style.left = `${targetRect.left}px`;
        wrap.style.alignItems = 'center';
        wrap.style.justifyContent = 'flex-start';
        inner.style.bottom = '0px';
        inner.style.left = '0px';
        break;
      case Position.TopRight:
        wrap.style.top = `${document.documentElement.scrollTop + targetRect.top - offsetY}px`;
        wrap.style.left = `${targetRect.left + targetRect.width}px`;
        wrap.style.alignItems = 'center';
        wrap.style.justifyContent = 'flex-end';
        inner.style.bottom = '0px';
        inner.style.right = '0px';
        break;
      case Position.Right:
        wrap.style.top = `${document.documentElement.scrollTop + targetRect.top + targetRect.height / 2}px`;
        wrap.style.left = `${targetRect.left + targetRect.width + offsetX}px`;
        wrap.style.alignItems = 'center';
        wrap.style.justifyContent = 'flex-start';
        inner.style.left = '0px';
        break;
      case Position.RightTop:
        wrap.style.top = `${document.documentElement.scrollTop + targetRect.top}px`;
        wrap.style.left = `${targetRect.left + targetRect.width + offsetX}px`;
        wrap.style.alignItems = 'flex-start';
        wrap.style.justifyContent = 'flex-start';
        inner.style.left = '0px';
        inner.style.top = '0px';
        break;
      case Position.RightBottom:
        wrap.style.top = `${document.documentElement.scrollTop + targetRect.top + targetRect.height}px`;
        wrap.style.left = `${targetRect.left + targetRect.width + offsetX}px`;
        inner.style.alignItems = 'flex-end';
        inner.style.justifyContent = 'flex-start';
        inner.style.left = '0px';
        inner.style.bottom = '0px';
        break;
      case Position.Bottom:
        wrap.style.top = `${document.documentElement.scrollTop + targetRect.top + targetRect.height + offsetY}px`;
        wrap.style.left = `${targetRect.left + targetRect.width / 2}px`;
        wrap.style.alignItems = 'flex-start';
        wrap.style.justifyContent = 'center';
        inner.style.top = '0px';
        break;
      case Position.BottomLeft:
        wrap.style.top = `${document.documentElement.scrollTop + targetRect.top + targetRect.height + offsetY}px`;
        wrap.style.left = `${targetRect.left}px`;
        wrap.style.alignItems = 'flex-start';
        wrap.style.justifyContent = 'flex-start';
        inner.style.top = '0px';
        inner.style.left = '0px';
        break;
      case Position.BottomRight:
        wrap.style.top = `${document.documentElement.scrollTop + targetRect.top + targetRect.height + offsetY}px`;
        wrap.style.left = `${targetRect.left + targetRect.width}px`;
        wrap.style.alignItems = 'flex-start';
        wrap.style.justifyContent = 'flex-end';
        inner.style.top = '0px';
        inner.style.right = '0px';
        break;
      case Position.Left:
        wrap.style.top = `${document.documentElement.scrollTop + targetRect.top + targetRect.height / 2}px`;
        wrap.style.left = `${targetRect.left - offsetX}px`;
        wrap.style.alignItems = 'center';
        wrap.style.justifyContent = 'flex-end';
        inner.style.right = '0px';
        break;
      case Position.LeftTop:
        wrap.style.top = `${document.documentElement.scrollTop + targetRect.top}px`;
        wrap.style.left = `${targetRect.left - offsetX}px`;
        wrap.style.alignItems = 'flex-start';
        wrap.style.justifyContent = 'flex-end';
        inner.style.right = '0px';
        inner.style.top = '0px';
        break;
      case Position.LeftBottom:
        wrap.style.top = `${document.documentElement.scrollTop + targetRect.top + targetRect.height}px`;
        wrap.style.left = `${targetRect.left - offsetX}px`;
        wrap.style.alignItems = 'flex-end';
        wrap.style.justifyContent = 'flex-end';
        inner.style.right = '0px';
        inner.style.bottom = '0px';
        break;
    }

    document.documentElement.append(wrap);
    this._hintWrap = wrap;
    this._slotForHint = inner;
  }

  protected _mountHint(component) {
    this._slotForHint.append(component);
  }

  protected _show() {
    this._hintWrap.classList.add('newbie-hint-wrap_visible');
  }
  protected _hide() {
    this._hintWrap.classList.remove('newbie-hint-wrap_visible');
  }
}
