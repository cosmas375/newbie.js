import { IShadow, IShadowSettings } from "../../Interfaces";
import { HtmlShadow } from './HtmlShadow';
import { SvgShadow } from './SvgShadow';
import { NullShadow } from './NullShadow';

export class ShadowFactory {
  public static TYPE_HTML = 'html';
  public static TYPE_SVG = 'svg';

  public static create(shadow: IShadowSettings): IShadow {
    switch (shadow.type) {
      case this.TYPE_HTML:
        return new HtmlShadow(shadow);
      case this.TYPE_SVG:
        return new SvgShadow(shadow);
      default:
        return new NullShadow(shadow);
    }
  }
}
