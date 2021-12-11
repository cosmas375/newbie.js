import { ClassNames } from '../../Interfaces';
import { AbstractHint } from './AbstractHint';

export class VueHint extends AbstractHint {
    private _component: any;
    private _handlers: object;
    private _content: object;
    private _vue: any;

    constructor(settings, { Vue }) {
        super(settings);

        this._component = settings.component;
        this._handlers = settings.handlers || {};
        this._vue = Vue;
    }

    mount(targetElement) {
        super.mount(targetElement);

        const component = this._vue.extend(this._component);
        const hint = new component({ propsData: this._content }).$mount();
        Object.keys(this._handlers).forEach((event) => {
            hint.$on(event, this._handlers[event]);
        });
        const elem = hint.$el;
        elem.classList.add(ClassNames.HINT);

        super._mountHint(elem);
        super._show();
    }

    setContent(content: object = {}) {
        this._content = content;
    }
}
