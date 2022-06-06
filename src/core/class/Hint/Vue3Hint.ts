import { IHintConfig, IHintSettings } from '../../Interfaces';
import { ClassNames } from '../../ClassName';
import { Hint } from './Hint';

export class Vue3Hint extends Hint {
    private _vueComponent: object;
    private _createApp: any;
    private _settings: IHintSettings;

    constructor(config: IHintConfig, settings: IHintSettings, createApp: any) {
        super(config);

        this._createApp = createApp;
        this._vueComponent = config.component;
        this._settings = settings;
    }

    public mount() {
        this._component = this._getHintHTMLElement();
        return this._component;
    }

    private _getHintHTMLElement(): HTMLElement {
        const div = document.createElement('div');

        const app = this._createApp(this._vueComponent, {
            ...this._content,
            ...this._settings,
        });

        app.provide('goNext', this._settings.goNext);
        app.provide('goPrevious', this._settings.goPrevious);
        app.provide('stop', this._settings.stop);
        app.provide('goTo', this._settings.goTo);

        const hint = app.mount(div);

        const elem = hint.$el;
        elem.classList.add(ClassNames.HINT);
        return elem;
    }
}
