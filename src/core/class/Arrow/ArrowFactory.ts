import { ArrowType, IArrowConfig } from '../../Interfaces';
import { NullArrow } from './NullArrow';
import { TriangleArrow } from './TriangleArrow';

export class ArrowFactory {
    private static _triangleArrow: TriangleArrow;
    private static _nullArrow: NullArrow;

    static create(config: IArrowConfig) {
        switch (config.type) {
            case ArrowType.TRIAGLE:
                if (!this._triangleArrow) {
                    this._triangleArrow = new TriangleArrow();
                }
                return this._triangleArrow;

            case ArrowType.NULL:
            default:
                if (!this._nullArrow) {
                    this._nullArrow = new NullArrow();
                }
                return this._nullArrow;
        }
    }
}
