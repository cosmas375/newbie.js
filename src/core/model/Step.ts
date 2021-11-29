import { IStepConfig, TStepTarget, TStepCallback } from '../helpers/Config';
import getTargetElement from '../utils/getTargetElement';
import getCallback from '../utils/getCallback';
import { IShadow, Shadow } from './Shadow';
import { IHint, Hint } from './Hint';
import _throw from '../utils/throw';

export interface IStep {
  mount(): void,
  unmount(): void,
}

export class Step implements IStep {
  private _id: string;
  private _target: TStepTarget;

  private _shadow: IShadow;
  private _hint: IHint;

  private _beforeMount(): TStepCallback { };
  private _mounted(targetElement: HTMLElement): TStepCallback { };
  private _beforeUnmount(targetElement: HTMLElement): TStepCallback { };
  private _unmounted(): TStepCallback { };

  private _targetElement: HTMLElement;

  constructor(config: IStepConfig) {
    this._id = String(config.id);
    this._target = config.target;
    this._shadow = Shadow.create(config.shadow.type, config.shadow.settings);
    this._hint = Hint.create(config.hint);
    this._hint.setContent(config.content);

    this._beforeMount = getCallback(config.beforeMount);
    this._mounted = getCallback(config.beforeMount);
    this._beforeUnmount = getCallback(config.beforeMount);
    this._unmounted = getCallback(config.beforeMount);
  }

  public mount(): void {
    this._beforeMount();

    const targetElement = getTargetElement(this._target);

    if (!targetElement) {
      _throw(`Target for step [${this._id}] was not found!`);
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

    window.scrollTo({ top });
  }

  private _mountShadow(): void {
    this._shadow.mount(this._targetElement);
  }

  private _mountOutline(): void {
    console.log(`outline of ${this._id} mounted`);
  }

  private _mountHint(): void {
    this._hint.mount(this._targetElement);
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
    this._hint.unmount();
  }

  private _unmountArrow(): void {
    console.log(`arrow of ${this._id} unmounted`);
  }
}

type TStepError = string;
