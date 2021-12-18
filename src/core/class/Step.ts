import {
    IStep,
    IStepConfig,
    IHintFactory,
    IHint,
    IShadow,
    TStepCallback,
    TStepTarget,
} from '../Interfaces';
import getCallback from '../utils/getCallback';
import { ShadowFactory } from './Shadow/ShadowFactory';
import _throw from '../utils/throw';

export class Step implements IStep {
    private _target: TStepTarget;
    private _content: string;

    private _shadow: IShadow;
    private _hint: IHint;

    private _beforeMount(): TStepCallback {}
    private _mounted(targetElement: HTMLElement): TStepCallback {}
    private _beforeUnmount(targetElement: HTMLElement): TStepCallback {}
    private _unmounted(): TStepCallback {}

    private static _hintFactory: IHintFactory;
    private _targetElement: HTMLElement;

    constructor(config: IStepConfig, settings: object) {
        this._target = config.target;
        this._content = config.content;
        this._shadow = ShadowFactory.create(config.shadow);
        this._hint = Step._hintFactory.create({
            config: config.hint,
            settings,
        });

        this._setLifeCycleHooks(config);
    }

    public mount(): void {
        this._beforeMount();

        this._targetElement = this.targetElement;
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

    public get targetElement() {
        return typeof this._target === 'string'
            ? document.querySelector(this._target)
            : this._target;
    }

    public static setHintFactory(factory: IHintFactory): void {
        this._hintFactory = factory;
    }

    private _setLifeCycleHooks(config: IStepConfig): void {
        this._beforeMount = getCallback(config.beforeMount);
        this._mounted = getCallback(config.mounted);
        this._beforeUnmount = getCallback(config.beforeUnmount);
        this._unmounted = getCallback(config.unmounted);
    }

    private _scrollToTarget(): void {
        const targetRect = this._targetElement.getBoundingClientRect();

        const beautifyingFactor = 0.8;
        let offsetTop = 0;
        if (window.innerHeight > targetRect.height) {
            offsetTop =
                ((window.innerHeight - targetRect.height) / 2) *
                beautifyingFactor;
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

    private _mountArrow(): void {}

    private _unmountShadow(): void {
        this._shadow.unmount();
    }

    private _unmountHint(): void {
        this._hint.unmount();
    }

    private _unmountArrow(): void {}
}
