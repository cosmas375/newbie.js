import { IHintConfig, IHintSettings } from '../../Interfaces';
import { ClassNames } from '../../ClassName';
import { Hint } from './Hint';

export class ReactHint extends Hint {
    private _reactComponent: any;
    private _settings: IHintSettings;

    private _ReactDOM: any;

    constructor(config: IHintConfig, settings: IHintSettings, ReactDom: any) {
        super(config);

        this._reactComponent = config.component;
        this._settings = settings;

        this._ReactDOM = ReactDom;
    }

    public async mount() {
        this._component = await this._getHintHTMLElement();
        return this._component;
    }

    private _getHintHTMLElement(): Promise<HTMLElement> {
        return new Promise(resolve => {
            const div = document.createElement('div');
            const root = this._ReactDOM.createRoot(div);
            const props = {
                ...this._content,
                ...this._settings,
                goNext: this._settings.goNext,
                goPrevious: this._settings.goPrevious,
                stop: this._settings.stop,
                goTo: this._settings.goTo,
            };

            root.render(this._reactComponent(props));

            setTimeout(() => {
                const elem = div;
                elem.classList.add(ClassNames.HINT);
                resolve(elem);
            });
        });
    }
}
