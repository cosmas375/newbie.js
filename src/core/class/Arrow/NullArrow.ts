import { IArrow } from '../../Interfaces';

export class NullArrow implements IArrow {
    public mount(): void {}
    public unmount(): void {}
}
