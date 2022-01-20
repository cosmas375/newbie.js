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
    TElement,
    IHintSettings,
} from '../Interfaces';
import { Position } from '../Position';
import { StepContainer } from './StepContainer/StepContainer';
import getCallback from '../utils/getCallback';
import { Globals } from './Globals';

export class Step implements IStep {
    private _id: string;
    private _target: TStepTarget;
    private _position: Position;
    private _offsetX: number;
    private _offsetY: number;
    private _transitionDuration: number;

    private _beforeMount(): TStepCallback {}
    private _mounted(targetElement: TElement): TStepCallback {}
    private _beforeUnmount(targetElement: TElement): TStepCallback {}
    private _unmounted(): TStepCallback {}

    private _shadowConfig: IShadowConfig;
    private _hintConfig: IHintConfig;
    private _contentConfig: object;
    private _arrowConfig: IArrowConfig;

    private _stepContainer: StepContainer;
    private _shadow: IShadow;
    private _hint: IHint;
    private _arrow: IArrow;

    private _targetElement: TElement;

    private _stepParams: IHintSettings;

    constructor(config: IStepConfig, stepParams: IHintSettings) {
        this._id = config.id;
        this._target = config.target;
        this._position = config.position;
        this._offsetX = config.offsetX;
        this._offsetY = config.offsetY;
        this._transitionDuration = config.transitionDuration;

        this._shadowConfig = config.shadow;
        this._hintConfig = config.hint;
        this._contentConfig = config.content;
        this._arrowConfig = config.arrow;

        this._stepParams = stepParams;

        this._createStepContainer();
        this._createShadow();
        this._createHint();
        this._createArrow();
        this._setLifeCycleHooks(config);
    }

    public get id(): string {
        return this._id;
    }

    public mount(): void {
        this._beforeMount();

        this._setTargetElement();
        this._scrollToTarget();
        this._mountStepContainer();
        this._mountShadow();
        this._mountHint();
        this._mountArrow();

        this._mounted(this._targetElement);
    }

    public unmount(): void {
        this._beforeUnmount(this._targetElement);

        this._unmountArrow();
        this._unmountHint();
        this._unmountShadow();
        this._unmountStepContainer();

        this._unmounted();
    }

    private _createStepContainer() {
        this._stepContainer = Globals.componentsFactory.createStepContainer({
            transitionDuration: this._transitionDuration,
        });
    }

    private _createShadow() {
        this._shadow = Globals.componentsFactory.createShadow(
            this._shadowConfig,
            { transitionDuration: this._transitionDuration }
        );
    }

    private _createHint() {
        this._hint = Globals.componentsFactory.createHint(
            this._hintConfig,
            this._stepParams
        );
        this._hint.setContent(this._contentConfig);
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
        this._shadow.mount(this._targetElement, this._shadowConfig);
    }
    private _unmountShadow(): void {
        this._shadow.unmount();
    }

    private _mountHint(): void {
        this._hint.mount();

        if (!this._hint.elem) {
            return;
        }

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

        if (!this._arrow.elem) {
            return;
        }

        this._stepContainer.append(this._arrow.elem);
    }
    private _unmountArrow(): void {
        this._arrow.unmount();
    }
}
