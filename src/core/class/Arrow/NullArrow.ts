import { IArrow, TElement } from '../../Interfaces';

export class NullArrow implements IArrow {
    public mount(): TElement {
        return document.createElement('div');
    }

    public unmount(): void {}
}
