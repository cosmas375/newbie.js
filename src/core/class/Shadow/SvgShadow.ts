import { ClassNames } from '../../Interfaces';
import { AbstractShadow } from './AbstractShadow';

export class SvgShadow extends AbstractShadow {
    private _block: Element;
    private _svg: Element;
    private _maskId: string = 'svg_shadow_mask';

    private _offset: number;
    private _borderRadius: number;

    constructor(settings) {
        super(settings);

        this._offset = settings.offset || 0;
        this._borderRadius = settings.borderRadius || 0;
    }

    public mount(target) {
        super.mount(target);

        this._createElements();
        this._update(target);
        this._show();
    }

    public unmount() {
        super.unmount();

        this._hide();
        this._removeElements();
    }

    private _createElements() {
        this._block = document.createElement('div');
        this._block.classList.add(ClassNames.SHADOW, ClassNames.SHADOW_SVG);

        this._svg = document.createElement('svg');
        this._svg.setAttribute('width', String(window.innerWidth));
        this._svg.setAttribute('height', String(window.innerHeight));
        this._svg.setAttribute(
            'viewBox',
            `0 0 ${window.innerWidth} ${window.innerHeight}`
        );

        const shadow = document.createElement('rect');
        shadow.setAttribute('width', String(window.innerWidth));
        shadow.setAttribute('height', String(window.innerHeight));
        shadow.setAttribute('fill', 'rgba(0,0,0,.3)');
        shadow.setAttribute('mask', `url(#${this._maskId})`);

        this._svg.append(shadow);
        this._block.append(this._svg);
        this._rootComponent.append(this._block);
    }

    private _removeElements() {
        this._block.remove();
    }

    private _update(target) {
        const targetRect = target.getBoundingClientRect();

        const defs = document.createElement('defs');
        const mask = document.createElement('mask');
        mask.setAttribute('id', this._maskId);

        const white = document.createElement('rect');
        white.setAttribute('x', '0');
        white.setAttribute('y', '0');
        white.setAttribute('width', String(window.innerWidth));
        white.setAttribute('height', String(window.innerHeight));
        white.setAttribute('fill', '#ffffff');

        const black = document.createElement('rect');
        black.setAttribute('x', String(targetRect.left - this._offset));
        black.setAttribute('y', String(targetRect.top - this._offset));
        black.setAttribute(
            'width',
            String(targetRect.width + 2 * this._offset)
        );
        black.setAttribute(
            'height',
            String(targetRect.height + 2 * this._offset)
        );
        black.setAttribute('rx', String(this._borderRadius));
        black.setAttribute('ry', String(this._borderRadius));
        black.setAttribute('fill', '#000000');

        mask.append(white);
        mask.append(black);
        defs.append(mask);
        this._svg.append(defs);
    }

    private _show() {
        this._block.classList.add(ClassNames.SHADOW_VISIBLE);

        // force rerender svg
        this._block.innerHTML += '';
    }

    private _hide() {
        this._block.classList.remove(ClassNames.SHADOW_VISIBLE);
    }
}
