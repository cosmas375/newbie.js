import getTargetElement from '../utils/getTargetElement';
import getCallback from '../utils/getCallback';

export interface IStep {
  id: string,
  mount(): void,
  unmount(): void,
}

export class Step implements IStep {
  private _id: string;
  private _target: TTarget;

  private _beforeMount(): TStepCallback {};
  private _mounted(targetElement: Element): TStepCallback {};
  private _beforeUnmount(targetElement: Element): TStepCallback {};
  private _unmounted(): TStepCallback {};

  private _onError(err?: TStepError): TStepCallback {};

  private _targetElement: Element;

  constructor(config: TStepConfig, { onError } = { onError: () => {} }) {
    this._id = String(config.id);
    this._target = config.target;

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
      this._onError(`Target for ${ this._id } not found!`);
      return;
    }

    this._targetElement = targetElement;
    this._scrollToTarget();
    this._mountShadow();
    this._mountHint();

    this._mounted(this._targetElement);
  }

  public unmount(): void {
    this._beforeUnmount(this._targetElement);

    // TODO: some code here
    this._unmountShadow();
    this._unmountHint();

    this._unmounted();
  }


  private _scrollToTarget(): void {
    const targetPosition = this._targetElement.getBoundingClientRect();

    window.scrollTo({
      top: document.body.scrollTop + targetPosition.top,
      behavior: 'smooth',
    });
  }

  private _mountShadow(): void {
    console.log('shadow mounted');
  }

  private _mountHint(): void {
    console.log('hint mounted');
  }

  private _unmountShadow(): void {
    console.log('shadow unmounted');
  }

  private _unmountHint(): void {
    console.log('hint unmounted');
  }
}

export type TStepConfig = {
  id: string,
  target: TTarget,
  beforeMount(): TStepCallback,
  mounted(targetElement: Element): TStepCallback,
  beforeUnmount(targetElement: Element): TStepCallback,
  unmounted(): TStepCallback,
}

export type TStepCallback = void;

export type TTarget = string | Element;

type TStepError = string;
