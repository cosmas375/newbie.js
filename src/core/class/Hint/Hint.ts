import { ClassNames, IHint, Position } from '../../Interfaces';
import px from '../../utils/px';

export class Hint implements IHint {
    protected _component: HTMLElement;
    private _slotForHint: HTMLElement;

    constructor(config) {}

    public mount(slot) {
        this._slotForHint = slot;
    }

    public unmount() {
        this._component.remove();
    }

    public setContent() {}

    protected _mountHint() {
        this._slotForHint.append(this._component);
    }
}
