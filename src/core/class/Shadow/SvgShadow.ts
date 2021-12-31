import { Shadow } from './Shadow';
import { ClassNames } from '../../Interfaces';
import createAnimation from '../../utils/createAnimation';
import getTransitionDuration from '../../utils/getTransitionDuration';

export class SvgShadow extends Shadow {
    private _transitionDuration: number;

    private _block: HTMLElement;
    private _root: HTMLElement;
    private _rootId: string = 'svg_shadow_root';
    private _maskId: string = 'svg_shadow_mask';
    private _blackId: string = 'svg_shadow_mask_black';
    private _shadowId: string = 'svg_shadow';

    private _x: string = null;
    private _y: string = null;
    private _width: string = null;
    private _height: string = null;
    private _rx: string = null;
    private _ry: string = null;
    private _color: string = null;

    constructor({ transitionDuration }) {
        super();
        this._transitionDuration = transitionDuration;
        this._createElements();
    }

    public mount(config) {
        super.mount(config);
        this._update(config);
        this._show();
    }

    public unmount() {
        super.unmount();
        this._hide();
    }

    private _createElements() {
        this._block = document.createElement('div');
        this._block.classList.add(ClassNames.SHADOW, ClassNames.SHADOW_SVG);

        const svg = document.createElement('svg');
        svg.setAttribute('id', this._rootId);
        svg.setAttribute('width', String(window.innerWidth));
        svg.setAttribute('height', String(window.innerHeight));
        svg.setAttribute(
            'viewBox',
            `0 0 ${window.innerWidth} ${window.innerHeight}`
        );
        this._root = svg;

        const ns = 'http://www.w3.org/2000/svg';

        const shadow = document.createElementNS(ns, 'rect');
        shadow.setAttribute('id', this._shadowId);
        shadow.setAttribute('width', String(window.innerWidth));
        shadow.setAttribute('height', String(window.innerHeight));
        shadow.setAttribute('mask', `url(#${this._maskId})`);

        svg.append(shadow);
        this._block.append(svg);
        document.body.append(this._block);

        const defs = document.createElementNS(ns, 'defs');
        const mask = document.createElementNS(ns, 'mask');
        mask.setAttribute('id', this._maskId);

        const white = document.createElementNS(ns, 'rect');
        white.setAttribute('x', '0');
        white.setAttribute('y', '0');
        white.setAttribute('width', String(window.innerWidth));
        white.setAttribute('height', String(window.innerHeight));
        white.setAttribute('fill', '#ffffff');

        const black = document.createElementNS(ns, 'rect');
        black.setAttribute('id', this._blackId);
        black.setAttribute('fill', '#000000');

        mask.append(white);
        mask.append(black);
        defs.append(mask);
        svg.append(defs);
    }

    private _update(config) {
        const targetRect = config.target.getBoundingClientRect();

        const x = String(targetRect.left - config.offset) || String(0);
        const y = String(targetRect.top - config.offset);
        const width = String(targetRect.width + 2 * config.offset);
        const height = String(targetRect.height + 2 * config.offset);
        const rx = String(config.borderRadius);
        const ry = String(config.borderRadius);
        const color = config.color;

        this._root.append(
            createAnimation({
                targetId: `#${this._shadowId}`,
                attribute: 'fill',
                from: this._color === null ? config.color : this._color,
                to: config.color,
                duration: getTransitionDuration(this._transitionDuration),
            })
        );

        this._root.append(
            createAnimation({
                targetId: `#${this._blackId}`,
                attribute: 'x',
                from: this._x === null ? x : this._x,
                to: x,
                duration: getTransitionDuration(this._transitionDuration),
            })
        );
        this._root.append(
            createAnimation({
                targetId: `#${this._blackId}`,
                attribute: 'y',
                from: this._y === null ? y : this._y,
                to: y,
                duration: getTransitionDuration(this._transitionDuration),
            })
        );
        this._root.append(
            createAnimation({
                targetId: `#${this._blackId}`,
                attribute: 'width',
                from: this._width === null ? width : this._width,
                to: width,
                duration: getTransitionDuration(this._transitionDuration),
            })
        );
        this._root.append(
            createAnimation({
                targetId: `#${this._blackId}`,
                attribute: 'height',
                from: this._height === null ? height : this._height,
                to: height,
                duration: getTransitionDuration(this._transitionDuration),
            })
        );
        this._root.append(
            createAnimation({
                targetId: `#${this._blackId}`,
                attribute: 'rx',
                from: this._rx === null ? rx : this._rx,
                to: rx,
                duration: getTransitionDuration(this._transitionDuration),
            })
        );
        this._root.append(
            createAnimation({
                targetId: `#${this._blackId}`,
                attribute: 'ry',
                from: this._ry === null ? ry : this._ry,
                to: ry,
                duration: getTransitionDuration(this._transitionDuration),
            })
        );

        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._rx = rx;
        this._ry = ry;
        this._color = color;
    }

    private _show() {
        this._block.classList.add(ClassNames.SHADOW_VISIBLE);

        // force rerender svg
        this._block.innerHTML += '';
        this._root = this._block.querySelector(`#${this._rootId}`);
    }

    private _hide() {
        this._block.classList.remove(ClassNames.SHADOW_VISIBLE);
    }
}
