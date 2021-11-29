import { Position } from "../helpers/Config";

export interface IHint {
  mount(target: HTMLElement): void;
  unmount(): void;
  setContent(content: string): void;
}

export class Hint {
  public static create(settings) {
    return new SimpleHint(settings);
  }
}

export class SimpleHint implements IHint {
  private _component: HTMLElement;
  private _content: string;
  private _position: Position;

  private _targetElement: HTMLElement;

  constructor({ component, position }) {
    this._component = component;
    this._position = position || Position.Top;
  }

  mount(targetElement) {
    this._targetElement = targetElement;
    this._positionComponent();
    this._show();
  }

  unmount() {
    this._hide();
  }

  setContent(content: string = '') {
    this._content = content;
    this._setContent();
  }


  private _setContent() {
    const contentElement = this._component.querySelector('[data-newbie-step-content]');
    if (!contentElement) {
      return;
    }
    contentElement.innerHTML = this._content;
  }

  private _positionComponent() {
    document.documentElement.append(this._component);
    this._component.style.position = 'absolute';
    const targetRect = this._targetElement.getBoundingClientRect();
    const offset = 10;
    this._component.style.top = `${document.documentElement.scrollTop + targetRect.top + offset}px`;
    this._component.style.left = `${targetRect.left + targetRect.width + offset}px`;
  }

  private _show() {
    this._component.style.display = 'block';
  }
  private _hide() {
    this._component.style.display = 'none';
  }
}