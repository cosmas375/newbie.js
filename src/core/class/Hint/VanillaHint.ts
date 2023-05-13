import { ClassName } from '../../ClassName';
import {
    TElement,
    THintConfig,
    THintSettings,
    TStepContent,
} from '../../Interfaces';
import { Hint } from './Hint';

export class VanillaHint extends Hint {
    private _settings: THintSettings;

    private _goNextButtonSelector = '[data-newbie-go-next]';
    private _goPreviousButtonSelector = '[data-newbie-go-previous]';
    private _stopButtonSelector = '[data-newbie-stop]';
    private _goToButtonSelector = '[data-newbie-go-to]';

    private _goToCallback() {}

    constructor(config: THintConfig, settings: THintSettings) {
        super(config);

        this._element = config.component;
        this._element.classList.add(ClassName.HINT);
        this._settings = settings;
    }

    public async mount() {
        this._setContent();
        this._addDefaultEventListeners();
        return this._element;
    }

    public unmount(): void {
        this._removeDefaultEventListeners();
        super.unmount();
    }

    private _setContent(): void {
        Object.keys(this._content).forEach(key => {
            const component = <HTMLElement>this._element.querySelector(key);
            const content = this._content[key];
            if (!component || !content) {
                return;
            }
            if (typeof content === 'string') {
                component.innerText = content;
            } else if (typeof content === 'object') {
                if (content.useHtml) {
                    component.innerHTML = content.text;
                } else {
                    component.innerText = content.text;
                }
            }
        });
    }

    private _addDefaultEventListeners(): void {
        const goNextBtn = this._element.querySelector(
            this._goNextButtonSelector
        );
        if (goNextBtn) {
            goNextBtn.addEventListener('click', this._settings.goNext);
        }

        const goPrevBtn = this._element.querySelector(
            this._goPreviousButtonSelector
        );
        if (goPrevBtn) {
            goPrevBtn.addEventListener('click', this._settings.goPrevious);
        }

        const stopBtn = this._element.querySelector(this._stopButtonSelector);
        if (stopBtn) {
            stopBtn.addEventListener('click', this._settings.stop);
        }

        const goToBtn = this._element.querySelector(this._goToButtonSelector);
        if (goToBtn instanceof HTMLElement) {
            this._goToCallback = () => {
                this._settings.goTo(goToBtn.dataset.newbieTargetStepId || '');
            };
            goToBtn.addEventListener('click', this._goToCallback);
        }
    }

    private _removeDefaultEventListeners(): void {
        const goNextBtn = this._element.querySelector(
            this._goNextButtonSelector
        );
        if (goNextBtn) {
            goNextBtn.removeEventListener('click', this._settings.goNext);
        }

        const goPrevBtn = this._element.querySelector(
            this._goPreviousButtonSelector
        );
        if (goPrevBtn) {
            goPrevBtn.removeEventListener('click', this._settings.goPrevious);
        }

        const stopBtn = this._element.querySelector(this._stopButtonSelector);
        if (stopBtn) {
            stopBtn.removeEventListener('click', this._settings.stop);
        }

        const goToBtn = this._element.querySelector(this._goToButtonSelector);
        if (goToBtn) {
            goToBtn.removeEventListener('click', this._settings.stop);
        }
    }
}
