import { IArrow, IArrowConfig } from '../../Interfaces';
import { NullArrow } from './NullArrow';
import { TriangleArrow } from './TriangleArrow';

export class ArrowFactory {
    private static _triangleArrow: IArrow;
    private static _nullArrow: IArrow;

    static create(config: IArrowConfig): IArrow {
        if (config.enabled) {
            if (!this._triangleArrow) {
                this._triangleArrow = new TriangleArrow();
            }
            return this._triangleArrow;
        } else {
            if (!this._nullArrow) {
                this._nullArrow = new NullArrow();
            }
            return this._nullArrow;
        }
    }
}
