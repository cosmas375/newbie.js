import { IArrow, TArrowConfig } from '../../Interfaces';
import { NullArrow } from './NullArrow';
import { TriangleArrow } from './TriangleArrow';

export class ArrowFactory {
    private static _triangleArrow: IArrow | null = null;
    private static _nullArrow: IArrow | null = null;

    static create(config: TArrowConfig): IArrow {
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
