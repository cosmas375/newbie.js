import { IShadow } from '../../Interfaces';
import { HtmlShadow } from './HtmlShadow';
import { SvgShadow } from './SvgShadow';
import { NullShadow } from './NullShadow';

export class ShadowFactory {
    public static TYPE_NULL = null;
    public static TYPE_HTML = 'html';
    public static TYPE_SVG = 'svg';

    private static _svgShadow: SvgShadow;

    public static create({ config, settings }): IShadow {
        switch (config.type) {
            case this.TYPE_HTML:
                return new HtmlShadow();
            case this.TYPE_SVG:
                if (!this._svgShadow) {
                    this._svgShadow = new SvgShadow(settings);
                }
                return this._svgShadow;
            default:
                return new NullShadow();
        }
    }
}
