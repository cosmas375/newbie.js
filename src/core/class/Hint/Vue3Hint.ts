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

    public async mount() {
        this._component = this._getHintHTMLElement();
        return this._component;
    }

    private _getHintHTMLElement(): HTMLElement {
        const div = document.createElement('div');

        const app = this._createApp(
            this._vueComponent,
            {
                ...this._content,

                onGoNext: this._settings.goNext,
                onGoPrevious: this._settings.goPrevious,
                onStop: this._settings.stop,
                onGoTo: this._settings.goTo,
            },
        );

        const hint = app.mount(div);

        const elem = hint.$el;
        elem.classList.add(ClassNames.HINT);
        return elem;
    }
}
