import {
    IArrow,
    IHint,
    IShadow,
    THintSettings,
    TTargetElement,
    TValidStepConfig,
} from '../Interfaces';
import { Position } from '../Position';
import { Globals } from './Globals';
import { StepContainer } from './StepContainer/StepContainer';

export class StepView {
    private _config: TValidStepConfig;
    private _hintSettings: THintSettings;

    private _targetElement: TTargetElement = null;

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
        if (!this._targetElement) {
            return;
        }
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
