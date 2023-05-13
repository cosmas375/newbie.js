import { ClassName } from '../../ClassName';
import { TElement, THintConfig, THintSettings } from '../../Interfaces';
import { Hint } from './Hint';

export class Vue2Hint extends Hint {
    private _vueComponent: object;
    private _Vue: any;
    private _settings: THintSettings;

    constructor(config: THintConfig, settings: THintSettings, Vue: object) {
        super(config);

        this._Vue = Vue;
        this._vueComponent = config.component;
        this._settings = settings;
    }

    public async mount() {
        this._element = this._getHintHTMLElement();
        return this._element;
    }

    private _getHintHTMLElement(): TElement {
        const component = this._Vue.extend(this._vueComponent);
        const hint = new component({
            propsData: { ...this._content, ...this._settings },
        }).$mount();

        hint.$on('go-next', this._settings.goNext);
        hint.$on('go-previous', this._settings.goPrevious);
        hint.$on('stop', this._settings.stop);
        hint.$on('go-to', this._settings.goTo);

        const elem = hint.$el;
        elem.classList.add(ClassName.HINT);
        return elem;
    }
}
