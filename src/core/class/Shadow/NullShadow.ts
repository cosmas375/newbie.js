import { Shadow } from './Shadow';

export class NullShadow extends Shadow {
    constructor(settings) {
        super(settings);
    }

    public mount() {}

    public unmount() {}
}
