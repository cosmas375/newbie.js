import { IShadow, TShadowConfig } from '../../Interfaces';
import { NullShadow } from './NullShadow';
import { SvgShadow } from './SvgShadow';

export class ShadowFactory {
    private static _svgShadow: SvgShadow | null = null;

    public static create(config: TShadowConfig, settings: object): IShadow {
        if (config.enabled) {
            if (!this._svgShadow) {
                this._svgShadow = new SvgShadow(settings);
            }
            return this._svgShadow;
        } else {
            return new NullShadow();
        }
    }
}
