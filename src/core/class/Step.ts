import {
    IStep,
    IStepConfig,
    IHint,
    IShadow,
    TStepCallback,
    TStepTarget,
    IArrow,
    IShadowConfig,
    IArrowConfig,
    IHintConfig,
} from '../Interfaces';
import { Position } from '../Position';
import { StepContainer } from './StepContainer/StepContainer';
import getCallback from '../utils/getCallback';
import { Globals } from './Globals';

export class Step implements IStep {
    private _target: TStepTarget;
    private _position: Position;
    private _offsetX: number;
    private _offsetY: number;
    private _transitionDuration: number;

    private _beforeMount(): TStepCallback {}
    private _mounted(targetElement: HTMLElement): TStepCallback {}
    private _beforeUnmount(targetElement: HTMLElement): TStepCallback {}
    private _unmounted(): TStepCallback {}

    private _shadowConfig: IShadowConfig;
    private _hintConfig: IHintConfig;
    private _contentConfig: object;
    private _arrowConfig: IArrowConfig;

    private _stepContainer: StepContainer;
    private _shadow: IShadow;
    private _hint: IHint;
    private _arrow: IArrow;

    private _targetElement: HTMLElement;
    private _isMounted: boolean;

    private _settings: object;

    constructor(config: IStepConfig, settings: object) {
        this._target = config.target;
        this._position = config.position;
        this._offsetX = config.offsetX;
        this._offsetY = config.offsetY;
        this._transitionDuration = config.transitionDuration;

        this._shadowConfig = config.shadow;
        this._hintConfig = config.hint;
        this._contentConfig = config.content;
        this._arrowConfig = config.arrow;

        this._settings = settings;

        this._createStepContainer();
        this._createShadow();
        this._createHint();
        this._createArrow();
        this._setLifeCycleHooks(config);
    }

    get isMounted() {
        return this._isMounted;
    }

    public mount(): void {
        this._beforeMount();

        this._setTargetElement();
        this._scrollToTarget();
        this._mountStepContainer();
        this._mountShadow();
        this._mountHint();
        this._mountArrow();
        this._isMounted = true;

        this._mounted(this._targetElement);
    }

    public unmount(): void {
        if (!this._isMounted) {
            return;
        }

        this._beforeUnmount(this._targetElement);

        this._unmountArrow();
        this._unmountHint();
        this._unmountShadow();
        this._unmountStepContainer();
        this._isMounted = false;

        this._unmounted();
    }

    private _createStepContainer() {
        this._stepContainer = Globals.componentsFactory.createStepContainer({
            settings: {
                transitionDuration: this._transitionDuration,
            },
        });
    }

    private _createShadow() {
        this._shadow = Globals.componentsFactory.createShadow({
            config: this._shadowConfig,
            settings: { transitionDuration: this._transitionDuration },
        });
    }

    private _createHint() {
        this._hint = Globals.componentsFactory.createHint({
            config: this._hintConfig,
            content: this._contentConfig,
            settings: this._settings,
        });
    }

    private _createArrow() {
        this._arrow = Globals.componentsFactory.createArrow(this._arrowConfig);
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
        if (!this._targetElement) {
            return;
        }

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
        this._stepContainer.mount({
            targetElement: this._targetElement,
            position: this._position,
            offsetX: this._offsetX,
            offsetY: this._offsetY,
        });
    }
    private _unmountStepContainer() {
        this._stepContainer.unmount();
    }

    private _mountShadow(): void {
        this._shadow.mount({
            ...this._shadowConfig,
            targetElement: this._targetElement,
        });
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
        if (!this._targetElement) {
            return;
        }
        const hintRect = this._hint.elem.getBoundingClientRect();
        this._arrow.mount(this._arrowConfig, {
            hintRect,
            position: this._position,
        });
        this._stepContainer.append(this._arrow.elem);
    }
    private _unmountArrow(): void {
        this._arrow.unmount();
    }
}
