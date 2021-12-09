import { IStep, IStepSettings, IHintFactory, IHint, IShadow, TStepCallback, TStepTarget } from '../Interfaces';
import getCallback from '../utils/getCallback';
import { ShadowFactory } from './Shadow/ShadowFactory';
import _throw from '../utils/throw';

export class Step implements IStep {
  private _id: string;
  private _target: TStepTarget;
  private _content: string;

  private _shadow: IShadow;
  private _hint: IHint;

  private _beforeMount(): TStepCallback { };
  private _mounted(targetElement: HTMLElement): TStepCallback { };
  private _beforeUnmount(targetElement: HTMLElement): TStepCallback { };
  private _unmounted(): TStepCallback { };

  private static _hintFactory: IHintFactory;
  private _targetElement: HTMLElement;

  constructor(config: IStepSettings) {
    this._id = String(config.id);
    this._target = config.target;
    this._content = config.content;
    this._shadow = ShadowFactory.create(config.shadow.type, config.shadow.settings);
    this._hint = Step._hintFactory.create(config.hint);

    this._setLifeCycleHooks(config);
  }

  public mount(): void {
    this._beforeMount();

    this._getTargetElement();
    this._scrollToTarget();
    this._mountShadow();
    this._mountHint();
    this._mountArrow();

    this._mounted(this._targetElement);
  }

  public unmount(): void {
    this._beforeUnmount(this._targetElement);

    this._unmountShadow();
    this._unmountHint();
    this._unmountArrow();

    this._unmounted();
  }

  public static setHintFactory(factory: IHintFactory): void {
    this._hintFactory = factory;
  }


  private _setLifeCycleHooks(config: IStepSettings): void {
    this._beforeMount = getCallback(config.beforeMount);
    this._mounted = getCallback(config.mounted);
    this._beforeUnmount = getCallback(config.beforeUnmount);
    this._unmounted = getCallback(config.unmounted);
  }

  private _getTargetElement(): void {
    const element = typeof this._target === 'string'
      ? document.querySelector(this._target)
      : this._target;

    if (!element) {
      _throw(`Target for step [${this._id}] was not found!`);
      return;
    }

    this._targetElement = element || null;
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

  private _mountHint(): void {
    this._hint.setContent(this._content);
    this._hint.mount(this._targetElement);
  }

  private _mountArrow(): void {
    console.log(`arrow of ${this._id} mounted`);
  }

  private _unmountShadow(): void {
    this._shadow.unmount();
  }

  private _unmountHint(): void {
    this._hint.unmount();
  }

  private _unmountArrow(): void {
    console.log(`arrow of ${this._id} unmounted`);
  }
}
