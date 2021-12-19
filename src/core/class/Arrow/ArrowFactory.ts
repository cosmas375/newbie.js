import { ArrowType, IArrowConfg } from '../../Interfaces';
import { NullArrow } from './NullArrow';
import { TriangleArrow } from './TriangleArrow';

export class ArrowFactory {
    static create(config: IArrowConfg) {
        switch (config.type) {
            case ArrowType.TRIAGLE:
                return new TriangleArrow(config);
            case ArrowType.NULL:
            default:
                return new NullArrow();
        }
    }
}
