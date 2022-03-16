import { IArrow } from '../../Interfaces';

export class NullArrow implements IArrow {
    public mount() {
        return null;
    }
    public unmount(): void {}
}
