import { IHint } from '../../Interfaces';

export class Hint implements IHint {
    protected _component: HTMLElement;

    constructor(config) {
        /* continue regardless of error */
    }

    public get elem(): HTMLElement {
        return this._component;
    }

    public mount() {}

    public unmount() {
        this._component.remove();
    }
}
