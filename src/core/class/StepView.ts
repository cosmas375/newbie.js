import {
    IArrow, IHint, IShadow, TElement, THintSettings, TTargetElement, TValidStepConfig
} from '../Interfaces';
import { Position } from '../Position';
import { Globals } from './Globals';
import { StepContainer } from './StepContainer/StepContainer';

export class StepView {
    private _config: TValidStepConfig;
    private _hintSettings: THintSettings;

    private _targetElement: TTargetElement = null;
    private _hintElement: TElement | null = null;
    private _arrowElement: TElement | null = null;

    private _stepContainer: StepContainer;
    private _shadow: IShadow;
    private _hint: IHint;
    private _arrow: IArrow;

    constructor(config: TValidStepConfig, hintSettings: THintSettings) {
        this._config = config;
        this._hintSettings = hintSettings;

        this._stepContainer = this._createStepContainer();
        this._shadow = this._createShadow();
        this._hint = this._createHint();
        this._arrow = this._createArrow();
    }

    public async mount(): Promise<TTargetElement> {
        this._setTargetElement();
        await this._mountHint();
        this._mountArrow();
        this._mountStepContainer();
        this._scrollToTarget();
        this._mountShadow();
        return this._targetElement;
    }

    public async unmount(): Promise<void> {
        this._unmountStepContainer();
        this._unmountShadow();
        this._unmountArrow();
        this._unmountHint();
    }

    public reset(): void {
        this._shadow.reset();
    }

    private _createStepContainer(): StepContainer {
        return Globals.componentsFactory.createStepContainer({
            transitionDuration: this._config.transitionDuration,
        });
    }

    private _createShadow(): IShadow {
        return Globals.componentsFactory.createShadow(this._config.shadow, {
            transitionDuration: this._config.transitionDuration,
        });
    }

    private _createHint(): IHint {
        const hint = Globals.componentsFactory.createHint(
            this._config.hint,
            this._hintSettings
        );
        hint.setContent(this._config.content);
        return hint;
    }

    private _createArrow(): IArrow {
        return Globals.componentsFactory.createArrow(this._config.arrow);
    }

    private _setTargetElement(): void {
        const target = this._config.target;

        this._targetElement =
            typeof target === 'string'
                ? document.querySelector(target)
                : target;
    }

    private _scrollToTarget(): void {
        if (!this._targetElement || !this._hintElement || !this._arrowElement) {
            return;
        }

        const targetRect = this._targetElement.getBoundingClientRect();
        const hintRect = this._hintElement.getBoundingClientRect();
        const arrowRect = this._arrowElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        let offsetTop = 0;
        let offsetLeft = 0;
        const scrollTop = document.documentElement.scrollTop;
        const scrollLeft = document.documentElement.scrollLeft;
        const beautifyingOffset = 10;

        if (targetRect.height + hintRect.height > windowHeight) {
            switch (this._config.position) {
                case Position.Top:
                case Position.TopLeft:
                case Position.TopRight:
                    offsetTop =
                        scrollTop +
                        targetRect.top -
                        hintRect.height -
                        arrowRect.height -
                        this._config.offsetY -
                        beautifyingOffset;
                    break;

                case Position.Bottom:
                case Position.BottomLeft:
                case Position.BottomRight:
                    offsetTop =
                        scrollTop +
                        targetRect.top +
                        targetRect.height +
                        hintRect.height +
                        arrowRect.height +
                        this._config.offsetY +
                        beautifyingOffset -
                        windowHeight +
                        beautifyingOffset;
                    break;
            }
        } else {
            offsetTop =
                scrollTop +
                targetRect.top -
                (windowHeight - targetRect.height) / 2;
        }

        if (targetRect.width + hintRect.width > windowWidth) {
            switch (this._config.position) {
                case Position.Left:
                case Position.LeftTop:
                case Position.LeftBottom:
                    offsetLeft =
                        scrollLeft +
                        targetRect.left -
                        hintRect.width -
                        arrowRect.width -
                        this._config.offsetX -
                        beautifyingOffset;
                    break;
                case Position.Right:
                case Position.RightTop:
                case Position.RightBottom:
                    offsetLeft =
                        scrollLeft +
                        targetRect.left +
                        targetRect.width +
                        hintRect.width +
                        arrowRect.width +
                        this._config.offsetX +
                        beautifyingOffset -
                        windowWidth +
                        beautifyingOffset;
                    break;
            }
        } else {
            offsetLeft =
                scrollLeft +
                targetRect.left -
                (windowWidth - targetRect.width) / 2;
        }

        const top = Math.min(
            document.documentElement.scrollHeight,
            Math.max(0, offsetTop)
        );
        const left = Math.min(
            document.documentElement.scrollHeight,
            Math.max(0, offsetLeft)
        );

        window.scrollTo({ top, left });
    }

    private _mountStepContainer() {
        this._stepContainer.mount({
            targetElement: this._targetElement,
            position: this._config.position,
            offsetX: this._config.offsetX,
            offsetY: this._config.offsetY,
            arrowPadding: this._config.arrow.padding,
        });
    }
    private _unmountStepContainer() {
        this._stepContainer.unmount();
    }

    private _mountShadow(): void {
        this._shadow.mount(this._targetElement, this._config.shadow);
    }
    private _unmountShadow(): void {
        this._shadow.unmount();
    }

    private async _mountHint(): Promise<void> {
        this._hintElement = await this._hint.mount();
        this._stepContainer.appendHint(this._hintElement);
    }
    private _unmountHint(): void {
        this._hint.unmount();
    }

    private _mountArrow(): void {
        if (!this._targetElement) {
            return;
        }

        this._arrowElement = this._arrow.mount(this._config.arrow);
        this._stepContainer.appendArrow(this._arrowElement);
    }
    private _unmountArrow(): void {
        this._arrow.unmount();
    }
}
