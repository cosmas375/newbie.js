import { ClassNames, IHintSettings } from '../../Interfaces';
import { Hint } from './Hint';

export class VueHint extends Hint {
    private _vueComponent: object;
    private _content: object;
    private _Vue: any;
    private _settings: IHintSettings;

    constructor({ config, settings }, { Vue }) {
        super(config);

        this._Vue = Vue;
        this._vueComponent = config.component;
        this._settings = settings;
    }

    public mount(slot): void {
        super.mount(slot);

        this._component = this._getHintHTMLElement();

        super._mountHint();
    }

    public setContent(content: object = {}): void {
        this._content = content;
    }

    private _getHintHTMLElement(): HTMLElement {
        const component = this._Vue.extend(this._vueComponent);
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
