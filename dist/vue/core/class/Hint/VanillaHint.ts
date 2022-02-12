import { IHintConfig, IHintSettings } from '../../Interfaces';
import { ClassNames } from '../../ClassName';
import { Hint } from './Hint';

export class VanillaHint extends Hint {
    private _settings: IHintSettings;

    constructor(config: IHintConfig, settings: IHintSettings) {
        super(config);

        this._component = config.component;
        this._component.classList.add(ClassNames.HINT);
        this._settings = settings;
    }

    public mount(): void {
        this._setContent();
        this._addDefaultEventListeners();
    }

    public unmount(): void {
        this._removeDefaultEventListeners();
        super.unmount();
    }

    private _setContent(): void {
        Object.keys(this._content).forEach(key => {
            const component = <HTMLElement>this._component.querySelector(key);
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
        const goNextBtn = this._component.querySelector(
            '[data-newbie-go-next]'
        );
        if (goNextBtn) {
            goNextBtn.addEventListener('click', this._settings.goNext);
        }

        const goPrevBtn = this._component.querySelector(
            '[data-newbie-go-previous]'
        );
        if (goPrevBtn) {
            goPrevBtn.addEventListener('click', this._settings.goPrevious);
        }

        const stopBtn = this._component.querySelector('[data-newbie-stop]');
        if (stopBtn) {
            stopBtn.addEventListener('click', this._settings.stop);
        }
    }

    private _removeDefaultEventListeners(): void {
        const goNextBtn = this._component.querySelector(
            '[data-newbie-go-next]'
        );
        if (goNextBtn) {
            goNextBtn.removeEventListener('click', this._settings.goNext);
        }

        const goPrevBtn = this._component.querySelector(
            '[data-newbie-go-previous]'
        );
        if (goPrevBtn) {
            goPrevBtn.removeEventListener('click', this._settings.goPrevious);
        }

        const stopBtn = this._component.querySelector('[data-newbie-stop]');
        if (stopBtn) {
            stopBtn.removeEventListener('click', this._settings.stop);
        }
    }
}
