import { ClassNames, IHintSettings } from '../../Interfaces';
import { Hint } from './Hint';

export class VueHint extends Hint {
    private _component: any;
    private _content: object;
    private _Vue: any;
    private _settings: IHintSettings;

    constructor({ config, settings }, { Vue }) {
        super(config);

        this._Vue = Vue;
        this._component = config.component;
        this._settings = settings;
    }

    public mount(targetElement): void {
        super.mount(targetElement);

        const elem = this._getHintHTMLElement();

        super._mountHint(elem);
        super._show();
    }

    public setContent(content: object = {}): void {
        this._content = content;
    }

    private _getHintHTMLElement(): HTMLElement {
        const component = this._Vue.extend(this._component);
        const hint = new component({
            propsData: { ...this._content, ...this._settings },
        }).$mount();

        hint.$on('go-next', this._settings.goNext);
        hint.$on('go-previous', this._settings.goPrevious);
        hint.$on('stop', this._settings.stop);

        const elem = hint.$el;
        elem.classList.add(ClassNames.HINT);
        return elem;
    }
}
