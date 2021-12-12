import { ClassNames } from '../../Interfaces';
import { AbstractHint } from './AbstractHint';

export class SimpleHint extends AbstractHint {
    private _component: HTMLElement;
    private _content: object = {};

    constructor(settings) {
        super(settings);

        this._component = settings.component;
        this._component.classList.add(ClassNames.HINT);
    }

    mount(targetElement) {
        super.mount(targetElement);

        Object.keys(this._content).forEach(key => {
            const component = this._component.querySelector(key);
            if (!component) {
                return;
            }
            component.innerHTML = this._content[key];
        });

        super._mountHint(this._component);
        super._show();
    }

    setContent(content: object = {}) {
        this._content = content;
    }
}
