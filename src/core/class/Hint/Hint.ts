import { IHint, TElement, TStepContent } from '../../Interfaces';

export abstract class Hint implements IHint {
    protected _element: TElement;
    protected _content: TStepContent = {};

    constructor(config: object) {
        /* continue regardless of error */
        this._element = document.createElement('div');
    }

    public async mount() {
        return this._element;
    }

    public unmount() {
        if (!this._element) {
            return;
        }
        this._element.remove();
    }

    public setContent(content: TStepContent): void {
        this._content = content;
    }
}
