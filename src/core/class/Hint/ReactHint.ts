import { ClassName } from '../../ClassName';
import { TElement, THintConfig, THintSettings } from '../../Interfaces';
import { Hint } from './Hint';

export class ReactHint extends Hint {
    private _reactComponent: any;
    private _settings: THintSettings;

    private _ReactDOM: any;

    constructor(config: THintConfig, settings: THintSettings, ReactDom: any) {
        super(config);

        this._reactComponent = config.component;
        this._settings = settings;

        this._ReactDOM = ReactDom;
    }

    public async mount() {
        this._element = await this._getHintHTMLElement();
        return this._element;
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
                elem.classList.add(ClassName.HINT);
                resolve(elem);
            });
        });
    }
}
