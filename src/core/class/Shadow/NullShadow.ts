import { Shadow } from './Shadow';

export class NullShadow extends Shadow {
    constructor() {
        super();
    }

    public mount() {}

    public unmount() {}
}
