import { IHint } from '../../Interfaces';

export class Hint implements IHint {
    protected _component: HTMLElement;
    protected _content: object = {};

    constructor(config: object) {
        /* continue regardless of error */
    }

    public get elem(): HTMLElement {
        return this._component;
    }

    public mount() {}

    public unmount() {
        this._component.remove();
    }

    public setContent(content: object): void {
        this._content = content;
    }
}
