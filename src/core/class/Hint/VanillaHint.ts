import { ClassNames, IHintSettings } from '../../Interfaces';
import { Hint } from './Hint';

export class VanillaHint extends Hint {
    private _component: HTMLElement;
    private _content: object = {};
    private _settings: IHintSettings;

    constructor({ config, settings }) {
        super(config);

        this._component = config.component;
        this._component.classList.add(ClassNames.HINT);

        this._settings = settings;
    }

    mount(targetElement) {
        super.mount(targetElement);

        this._setContent();
        this._addDefaultEventListeners();

        super._mountHint(this._component);
        super._show();
    }

    unmount() {
        this._hide();
        this._removeDefaultEventListeners();
        super.unmount();
    }

    setContent(content: object = {}) {
        this._content = content;
    }

    private _setContent(): void {
        Object.keys(this._content).forEach(key => {
            const component = this._component.querySelector(key);
            if (!component) {
                return;
            }
            component.innerHTML = this._content[key];
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