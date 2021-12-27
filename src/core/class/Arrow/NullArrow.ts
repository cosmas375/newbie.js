import { IArrow } from '../../Interfaces';

export class NullArrow implements IArrow {
    public get elem() {
        return null;
    }
    public mount(): void {}
    public unmount(): void {}
}
