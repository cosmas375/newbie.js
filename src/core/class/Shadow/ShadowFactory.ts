import { IShadow, IShadowConfig } from '../../Interfaces';
import { SvgShadow } from './SvgShadow';
import { NullShadow } from './NullShadow';

export class ShadowFactory {
    private static _svgShadow: SvgShadow;

    public static create(config: IShadowConfig, settings: object): IShadow {
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
