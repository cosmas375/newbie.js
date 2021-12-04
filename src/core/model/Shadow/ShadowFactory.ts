import { HtmlShadow } from './HtmlShadow';
import { SvgShadow } from './SvgShadow';
import { NullShadow } from './NullShadow';
import { IShadowSettings } from "../Config";

export interface IShadow {
  mount(target: HTMLElement): void;
  unmount(): void;
}

export class ShadowFactory {
  public static TYPE_HTML = 'html';
  public static TYPE_SVG = 'svg';

  public static create(type, settings: IShadowSettings): IShadow {
    switch (type) {
      case this.TYPE_HTML:
        return new HtmlShadow(settings);
      case this.TYPE_SVG:
        return new SvgShadow(settings);
      default:
        return new NullShadow(settings);
    }
  }
}
