import {
    IStep,
    IStepConfig,
    IHint,
    IShadow,
    TStepCallback,
    TStepTarget,
    IArrow,
    Position,
} from '../Interfaces';
import { ComponentsFactory } from './ComponentsFactory';
import { StepContainer } from './StepContainer';
import getCallback from '../utils/getCallback';
import _throw from '../utils/throw';

export class Step implements IStep {
    private _target: TStepTarget;

    private _stepContainer: StepContainer;
    private _shadow: IShadow;
    private _hint: IHint;
    private _arrow: IArrow;

    private _beforeMount(): TStepCallback {}
    private _mounted(targetElement: HTMLElement): TStepCallback {}
    private _beforeUnmount(targetElement: HTMLElement): TStepCallback {}
    private _unmounted(): TStepCallback {}

    private _targetElement: HTMLElement;
    private _isMounted: boolean;

    constructor(config: IStepConfig, settings: object) {
        this._target = config.target;

        this._stepContainer = ComponentsFactory.createStepContainer({
            position: config.position || Position.Bottom,
            offsetX: config.offsetX || 10,
            offsetY: config.offsetY || 10,
        });
        this._shadow = ComponentsFactory.createShadow(config.shadow);
        this._hint = ComponentsFactory.createHint({
            config: config.hint,
            content: config.content,
            settings,
        });
        this._arrow = ComponentsFactory.createArrow(config.arrow);

        this._setLifeCycleHooks(config);
    }

    get mounted() {
        return this._isMounted;
    }

    public mount(): void {
        this._beforeMount();

        this._setTargetElement();
        if (!this._targetElement) {
            return;
        }
        this._scrollToTarget();
        this._mountStepContainer();
        this._mountShadow();
        this._mountHint();
        this._mountArrow();
        this._show();
        this._isMounted = true;

        this._mounted(this._targetElement);
    }

    public unmount(): void {
        if (!this._isMounted) {
            return;
        }

        this._beforeUnmount(this._targetElement);

        this._hide();
        this._unmountArrow();
        this._unmountHint();
        this._unmountShadow();
        this._unmountStepContainer();
        this._isMounted = false;

        this._unmounted();
    }

    private _setLifeCycleHooks(config: IStepConfig): void {
        this._beforeMount = getCallback(config.beforeMount);
        this._mounted = getCallback(config.mounted);
        this._beforeUnmount = getCallback(config.beforeUnmount);
        this._unmounted = getCallback(config.unmounted);
    }

    private _setTargetElement(): void {
        this._targetElement =
            typeof this._target === 'string'
                ? document.querySelector(this._target)
                : this._target;
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

    private _mountStepContainer() {
        this._stepContainer.mount(this._targetElement);
    }
    private _unmountStepContainer() {
        this._stepContainer.unmount();
    }

    private _mountShadow(): void {
        this._shadow.mount(this._targetElement);
    }
    private _unmountShadow(): void {
        this._shadow.unmount();
    }

    private _mountHint(): void {
        this._hint.mount();
        this._stepContainer.append(this._hint.elem);
    }
    private _unmountHint(): void {
        this._hint.unmount();
    }

    private _mountArrow(): void {
        this._arrow.mount();
        this._stepContainer.append(this._arrow.elem);
    }
    private _unmountArrow(): void {
        this._arrow.unmount();
    }

    private _show() {
        this._stepContainer.show();
    }
    private _hide() {
        this._stepContainer.hide();
    }
}
