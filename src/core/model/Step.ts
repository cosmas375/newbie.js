import { IStepConfig, TStepTarget, TStepCallback, TPosition } from '../helpers/Config';
import getTargetElement from '../utils/getTargetElement';
import getCallback from '../utils/getCallback';
import { IShadow, Shadow } from './Shadow';

export interface IStep {
  id: string,
  mount(): void,
  unmount(): void,
}

export class Step implements IStep {
  private _config: IStepConfig;

  private _id: string;
  private _target: TStepTarget;
  private _component: HTMLElement;
  private _content: string;
  private _position: TPosition;
  private _shadow: IShadow;

  private _beforeMount(): TStepCallback { };
  private _mounted(targetElement: HTMLElement): TStepCallback { };
  private _beforeUnmount(targetElement: HTMLElement): TStepCallback { };
  private _unmounted(): TStepCallback { };

  private _onError(err?: TStepError): TStepCallback { };

  private _targetElement: HTMLElement;

  constructor(config: IStepConfig, { onError } = { onError: () => { } }) {
    this._id = String(config.id);
    this._target = config.target;
    this._component = config.component;
    this._content = config.content;
    this._position = config.position;

    this._config = config;

    this._beforeMount = getCallback(config.beforeMount);
    this._mounted = getCallback(config.beforeMount);
    this._beforeUnmount = getCallback(config.beforeMount);
    this._unmounted = getCallback(config.beforeMount);
    this._onError = getCallback(onError);
  }

  get id() {
    return this._id;
  }

  public mount(): void {
    this._beforeMount();

    const targetElement = getTargetElement(this._target);

    if (!targetElement) {
      this._onError(`Target for step [${this._id}] was not found!`);
      return;
    }

    this._targetElement = targetElement;
    this._scrollToTarget();
    this._mountShadow();
    this._mountOutline();
    this._mountHint();
    this._mountArrow();

    this._mounted(this._targetElement);
  }

  public unmount(): void {
    this._beforeUnmount(this._targetElement);

    this._unmountShadow();
    this._unmountOutline();
    this._unmountHint();
    this._unmountArrow();

    this._unmounted();
  }


  private _scrollToTarget(): void {
    const targetRect = this._targetElement.getBoundingClientRect();

    const beautifyingFactor = .8;
    let offsetTop = 0;
    if (window.innerHeight > targetRect.height) {
      offsetTop = (window.innerHeight - targetRect.height) / 2 * beautifyingFactor;
    }

    const top = Math.min(
      document.documentElement.scrollHeight,
      Math.max(
        0,
        document.documentElement.scrollTop + targetRect.top - offsetTop
      )
    );

    window.scrollTo({
      top,
    });
  }

  private _mountShadow(): void {
    const shadow = Shadow.create(this._config.shadow.type, this._config.shadow.settings);
    this._shadow = shadow;
    this._shadow.mount(this._targetElement);
  }

  private _mountOutline(): void {
    console.log(`outline of ${this._id} mounted`);
  }

  private _mountHint(): void {
    const contentElement = this._component.querySelector('[data-newbie-step-content]');
    if (!contentElement) {
      return;
    }
    contentElement.innerHTML = this._content;
    document.documentElement.append(this._component);
    this._component.style.display = 'block';
    this._component.style.position = 'absolute';
    const targetRect = this._targetElement.getBoundingClientRect();
    const offset = 10;
    this._component.style.top = `${document.documentElement.scrollTop + targetRect.top + offset}px`;
    this._component.style.left = `${targetRect.left + targetRect.width + offset}px`;
  }

  private _mountArrow(): void {
    console.log(`arrow of ${this._id} mounted`);
  }

  private _unmountShadow(): void {
    this._shadow.unmount();
  }

  private _unmountOutline(): void {
    console.log(`outline of ${this._id} unmounted`);
  }

  private _unmountHint(): void {
    this._component.style.display = 'none';
  }

  private _unmountArrow(): void {
    console.log(`arrow of ${this._id} unmounted`);
  }
}


type TStepError = string;
