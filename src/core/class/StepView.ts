import {
    IStepView,
    IStepConfig,
    IHint,
    IShadow,
    IArrow,
    TElement,
    IHintSettings,
} from '../Interfaces';
import { StepContainer } from './StepContainer/StepContainer';
import { Globals } from './Globals';

export class StepView implements IStepView {
    private _config: IStepConfig;
    private _hintSettings: IHintSettings;

    private _targetElement: TElement;

    private _stepContainer: StepContainer;
    private _shadow: IShadow;
    private _hint: IHint;
    private _arrow: IArrow;

    constructor(config: IStepConfig, hintSettings: IHintSettings) {
        this._config = config;
        this._hintSettings = hintSettings;

        this._createStepContainer();
        this._createShadow();
        this._createHint();
        this._createArrow();
    }

    public async mount(): Promise<HTMLElement> {
        this._setTargetElement();
        this._scrollToTarget();
        this._mountShadow();
        await this._mountHint();
        this._mountArrow();
        this._mountStepContainer();
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

    private _createStepContainer() {
        this._stepContainer = Globals.componentsFactory.createStepContainer({
            transitionDuration: this._config.transitionDuration,
        });
    }

    private _createShadow() {
        this._shadow = Globals.componentsFactory.createShadow(
            this._config.shadow,
            { transitionDuration: this._config.transitionDuration }
        );
    }

    private _createHint() {
        this._hint = Globals.componentsFactory.createHint(
            this._config.hint,
            this._hintSettings
        );
        this._hint.setContent(this._config.content);
    }

    private _createArrow() {
        this._arrow = Globals.componentsFactory.createArrow(this._config.arrow);
    }

    private _setTargetElement(): void {
        const target = this._config.target;

        this._targetElement =
            typeof target === 'string'
                ? document.querySelector(target)
                : target;
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
        const component = await this._hint.mount();
        this._stepContainer.appendHint(component);
    }
    private _unmountHint(): void {
        this._hint.unmount();
    }

    private _mountArrow(): void {
        if (!this._targetElement) {
            return;
        }

        this._stepContainer.appendArrow(this._arrow.mount(this._config.arrow));
    }
    private _unmountArrow(): void {
        this._arrow.unmount();
    }
}
