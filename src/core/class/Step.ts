import {
    IStep,
    IStepConfig,
    IHintFactory,
    IHint,
    IShadow,
    TStepCallback,
    TStepTarget,
    IArrow,
    ClassNames,
    Position,
} from '../Interfaces';
import getCallback from '../utils/getCallback';
import { ShadowFactory } from './Shadow/ShadowFactory';
import { ArrowFactory } from './Arrow/ArrowFactory';
import px from '../utils/px';
import _throw from '../utils/throw';

export class Step implements IStep {
    private _target: TStepTarget;
    private _content: string;
    private _position: Position;
    private _offsetX: number;
    private _offsetY: number;

    private _shadow: IShadow;
    private _hint: IHint;
    private _arrow: IArrow;

    private _beforeMount(): TStepCallback {}
    private _mounted(targetElement: HTMLElement): TStepCallback {}
    private _beforeUnmount(targetElement: HTMLElement): TStepCallback {}
    private _unmounted(): TStepCallback {}

    private static _hintFactory: IHintFactory = null;
    private _targetElement: HTMLElement;
    private _stepContainer: HTMLElement;
    private _slotForHint: HTMLElement;
    private _isMounted: boolean;

    constructor(config: IStepConfig, settings: object) {
        this._target = config.target;
        this._content = config.content;
        this._position = config.position || Position.Bottom;
        this._offsetX = config.offsetX || 10;
        this._offsetY = config.offsetY || 10;

        this._shadow = ShadowFactory.create(config.shadow);
        this._hint = Step._hintFactory.create({
            config: config.hint,
            settings,
        });
        this._arrow = ArrowFactory.create(config.arrow);

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
        this._createStepContainer();
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
        this._removeStepContainer();
        this._isMounted = false;

        this._unmounted();
    }

    public static setHintFactory(factory: IHintFactory): void {
        if (this._hintFactory) {
            return;
        }
        this._hintFactory = factory;
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

    private _createStepContainer(): void {
        const wrap = document.createElement('div');
        wrap.classList.add(ClassNames.HINT_WRAP);
        const inner = document.createElement('div');
        inner.classList.add(ClassNames.HINT_WRAP_INNER);
        wrap.append(inner);

        const targetRect = this._targetElement.getBoundingClientRect();
        const offsetX = this._offsetX;
        const offsetY = this._offsetY;

        switch (this._position) {
            case Position.Top:
            default:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top -
                        offsetY
                );
                wrap.style.left = px(targetRect.left + targetRect.width / 2);
                wrap.style.alignItems = 'center';
                wrap.style.justifyContent = 'center';
                inner.style.bottom = px(0);
                break;
            case Position.TopLeft:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top -
                        offsetY
                );
                wrap.style.left = px(targetRect.left);
                wrap.style.alignItems = 'center';
                wrap.style.justifyContent = 'flex-start';
                inner.style.bottom = px(0);
                inner.style.left = px(0);
                break;
            case Position.TopRight:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top -
                        offsetY
                );
                wrap.style.left = px(targetRect.left + targetRect.width);
                wrap.style.alignItems = 'center';
                wrap.style.justifyContent = 'flex-end';
                inner.style.bottom = px(0);
                inner.style.right = px(0);
                break;
            case Position.Right:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height / 2
                );
                wrap.style.left = px(
                    targetRect.left + targetRect.width + offsetX
                );
                wrap.style.alignItems = 'center';
                wrap.style.justifyContent = 'flex-start';
                inner.style.left = px(0);
                break;
            case Position.RightTop:
                wrap.style.top = px(
                    document.documentElement.scrollTop + targetRect.top
                );
                wrap.style.left = px(
                    targetRect.left + targetRect.width + offsetX
                );
                wrap.style.alignItems = 'flex-start';
                wrap.style.justifyContent = 'flex-start';
                inner.style.left = px(0);
                inner.style.top = px(0);
                break;
            case Position.RightBottom:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height
                );
                wrap.style.left = px(
                    targetRect.left + targetRect.width + offsetX
                );
                inner.style.alignItems = 'flex-end';
                inner.style.justifyContent = 'flex-start';
                inner.style.left = px(0);
                inner.style.bottom = px(0);
                break;
            case Position.Bottom:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height +
                        offsetY
                );
                wrap.style.left = px(targetRect.left + targetRect.width / 2);
                wrap.style.alignItems = 'flex-start';
                wrap.style.justifyContent = 'center';
                inner.style.top = px(0);
                break;
            case Position.BottomLeft:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height +
                        offsetY
                );
                wrap.style.left = px(targetRect.left);
                wrap.style.alignItems = 'flex-start';
                wrap.style.justifyContent = 'flex-start';
                inner.style.top = px(0);
                inner.style.left = px(0);
                break;
            case Position.BottomRight:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height +
                        offsetY
                );
                wrap.style.left = px(targetRect.left + targetRect.width);
                wrap.style.alignItems = 'flex-start';
                wrap.style.justifyContent = 'flex-end';
                inner.style.top = px(0);
                inner.style.right = px(0);
                break;
            case Position.Left:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height / 2
                );
                wrap.style.left = px(targetRect.left - offsetX);
                wrap.style.alignItems = 'center';
                wrap.style.justifyContent = 'flex-end';
                inner.style.right = px(0);
                break;
            case Position.LeftTop:
                wrap.style.top = px(
                    document.documentElement.scrollTop + targetRect.top
                );
                wrap.style.left = px(targetRect.left - offsetX);
                wrap.style.alignItems = 'flex-start';
                wrap.style.justifyContent = 'flex-end';
                inner.style.right = px(0);
                inner.style.top = px(0);
                break;
            case Position.LeftBottom:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height
                );
                wrap.style.left = px(targetRect.left - offsetX);
                wrap.style.alignItems = 'flex-end';
                wrap.style.justifyContent = 'flex-end';
                inner.style.right = px(0);
                inner.style.bottom = px(0);
                break;
        }

        document.body.append(wrap);
        this._stepContainer = wrap;
        this._slotForHint = inner;
    }

    private _removeStepContainer() {
        this._stepContainer.remove();
    }

    private _mountShadow(): void {
        this._shadow.mount(this._targetElement);
    }

    private _mountHint(): void {
        this._hint.setContent(this._content);
        this._hint.mount(this._slotForHint);
    }

    private _mountArrow(): void {
        this._arrow.mount({
            position: this._position,
            container: this._slotForHint,
        });
    }

    private _show() {
        this._stepContainer.classList.add(ClassNames.HINT_WRAP_VISIBLE);
    }
    private _hide() {
        this._stepContainer.classList.remove(ClassNames.HINT_WRAP_VISIBLE);
    }

    private _unmountShadow(): void {
        this._shadow.unmount();
    }

    private _unmountHint(): void {
        this._hint.unmount();
    }

    private _unmountArrow(): void {
        this._arrow.unmount();
    }
}
