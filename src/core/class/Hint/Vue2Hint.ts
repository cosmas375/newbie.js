import { IHintConfig, IHintSettings } from '../../Interfaces';
import { ClassNames } from '../../ClassName';
import { Hint } from './Hint';

export class Vue2Hint extends Hint {
    private _vueComponent: object;
    private _Vue: any;
    private _settings: IHintSettings;

    constructor(config: IHintConfig, settings: IHintSettings, Vue: object) {
        super(config);

        this._Vue = Vue;
        this._vueComponent = config.component;
        this._settings = settings;
    }

    public mount() {
        this._component = this._getHintHTMLElement();
        return this._component;
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
