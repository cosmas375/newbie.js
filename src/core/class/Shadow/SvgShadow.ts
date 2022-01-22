import { Shadow } from './Shadow';
import { ClassNames } from '../../ClassName';
import getTransitionDuration from '../../utils/getTransitionDuration';
import debounce from '../../utils/debounce';
import { IShadowConfig } from '../../Interfaces';
import px from '../../utils/px';

export class SvgShadow extends Shadow {
    private _targetElement: HTMLElement;

    private _transitionDuration: number;

    private _block: HTMLElement;
    private _svgRoot: HTMLElement;
    private _svgRootId: string = 'shadow_root';
    private _maskId: string = 'shadow_mask';
    private _blackId: string = 'shadow_mask_black';
    private _shadowId: string = 'shadow';
    private _resizeCallback: any;

    private _overlayBlockT: HTMLElement;
    private _overlayBlockR: HTMLElement;
    private _overlayBlockB: HTMLElement;
    private _overlayBlockL: HTMLElement;

    private _x: string = null;
    private _y: string = null;
    private _width: string = null;
    private _height: string = null;
    private _rx: string = null;
    private _ry: string = null;
    private _color: string = null;

    constructor({ transitionDuration }: any) {
        super();
        this._transitionDuration = transitionDuration || 1;
        this._createElements();
    }

    public mount(targetElement: HTMLElement, config: IShadowConfig) {
        this._targetElement = targetElement;
        super.mount(targetElement, config);
        this._update();
        this._show();

        this._resizeCallback = debounce(this._update).bind(this);
        window.addEventListener('resize', this._resizeCallback);
    }

    public unmount() {
        super.unmount();
        this._hide();
        window.removeEventListener('resize', this._resizeCallback);
    }

    private _createElements() {
        this._createSvgElements();
        this._createOverlayElements();
    }

    private _update() {
        this._updateSvg();
        this._updateOverlay();
    }

    private _show() {
        this._showSvg();
        this._showOverlay();
    }

    private _hide() {
        this._hideSvg();
        this._hideOverlay();
    }

    private _createSvgElements() {
        const block = document.createElement('div');
        block.classList.add(ClassNames.SHADOW);

        const svg = document.createElement('svg');
        svg.classList.add(ClassNames.SHADOW_SVG);
        svg.setAttribute('id', this._svgRootId);
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');

        const shadow = document.createElement('rect');
        shadow.setAttribute('id', this._shadowId);
        shadow.setAttribute('width', '100%');
        shadow.setAttribute('height', '100%');
        shadow.setAttribute('mask', `url(#${this._maskId})`);

        const defs = document.createElement('defs');
        const mask = document.createElement('mask');
        mask.setAttribute('id', this._maskId);

        const white = document.createElement('rect');
        white.setAttribute('x', '0');
        white.setAttribute('y', '0');
        white.setAttribute('width', '100%');
        white.setAttribute('height', '100%');
        white.setAttribute('fill', '#ffffff');

        const black = document.createElement('rect');
        black.setAttribute('id', this._blackId);
        black.setAttribute('fill', '#000000');

        block.append(svg);
        svg.append(shadow, defs);
        defs.append(mask);
        mask.append(white, black);

        document.body.append(block);

        this._svgRoot = svg;
        this._block = block;
    }

    private _createOverlayElements() {
        const topBlock = document.createElement('div');
        const rightBlock = document.createElement('div');
        const bottomBlock = document.createElement('div');
        const leftBlock = document.createElement('div');

        topBlock.classList.add(
            ClassNames.SHADOW_OVERLAY,
            ClassNames.SHADOW_OVERLAY_TOP
        );
        rightBlock.classList.add(
            ClassNames.SHADOW_OVERLAY,
            ClassNames.SHADOW_OVERLAY_RIGHT
        );
        bottomBlock.classList.add(
            ClassNames.SHADOW_OVERLAY,
            ClassNames.SHADOW_OVERLAY_BOTTOM
        );
        leftBlock.classList.add(
            ClassNames.SHADOW_OVERLAY,
            ClassNames.SHADOW_OVERLAY_LEFT
        );

        this._block.append(topBlock, rightBlock, bottomBlock, leftBlock);

        this._overlayBlockT = topBlock;
        this._overlayBlockR = rightBlock;
        this._overlayBlockB = bottomBlock;
        this._overlayBlockL = leftBlock;
    }

    private _updateSvg() {
        const color = this._config.color;
        let x = String(window.innerWidth / 2);
        let y = String(window.innerHeight / 2);
        let width = String(0);
        let height = String(0);
        let rx = String(0);
        let ry = String(0);

        if (this._targetElement) {
            const targetRect = this._targetElement.getBoundingClientRect();
            x = String(targetRect.left - this._config.offset);
            y = String(targetRect.top - this._config.offset);
            width = String(targetRect.width + 2 * this._config.offset);
            height = String(targetRect.height + 2 * this._config.offset);
            rx = String(this._config.borderRadius);
            ry = String(this._config.borderRadius);
        }

        this._resetAnimations();

        this._svgRoot.append(
            this._createAnimation({
                targetId: `#${this._shadowId}`,
                attribute: 'fill',
                from: this._color === null ? color : this._color,
                to: color,
                duration: getTransitionDuration(this._transitionDuration),
            }),
            this._createAnimation({
                targetId: `#${this._blackId}`,
                attribute: 'x',
                from: this._x === null ? x : this._x,
                to: x,
                duration: getTransitionDuration(this._transitionDuration),
            }),
            this._createAnimation({
                targetId: `#${this._blackId}`,
                attribute: 'y',
                from: this._y === null ? y : this._y,
                to: y,
                duration: getTransitionDuration(this._transitionDuration),
            }),
            this._createAnimation({
                targetId: `#${this._blackId}`,
                attribute: 'width',
                from: this._width === null ? width : this._width,
                to: width,
                duration: getTransitionDuration(this._transitionDuration),
            }),
            this._createAnimation({
                targetId: `#${this._blackId}`,
                attribute: 'height',
                from: this._height === null ? height : this._height,
                to: height,
                duration: getTransitionDuration(this._transitionDuration),
            }),
            this._createAnimation({
                targetId: `#${this._blackId}`,
                attribute: 'rx',
                from: this._rx === null ? rx : this._rx,
                to: rx,
                duration: getTransitionDuration(this._transitionDuration),
            }),
            this._createAnimation({
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

        this._svgRoot.outerHTML += '';
        this._svgRoot = this._block.querySelector(`#${this._svgRootId}`);
    }

    _updateOverlay() {
        if (this._targetElement) {
            const targetRect = this._targetElement.getBoundingClientRect();

            this._overlayBlockT.style.height = px(targetRect.top);

            this._overlayBlockR.style.top = px(targetRect.top);
            this._overlayBlockR.style.left = px(
                targetRect.left + targetRect.width
            );
            this._overlayBlockR.style.width = px(
                window.innerWidth - (targetRect.left + targetRect.width)
            );
            this._overlayBlockR.style.height = px(targetRect.height);

            this._overlayBlockB.style.top = px(
                targetRect.top + targetRect.height
            );
            this._overlayBlockB.style.height = px(
                window.innerHeight - (targetRect.top + targetRect.height)
            );

            this._overlayBlockL.style.top = px(targetRect.top);
            this._overlayBlockL.style.width = px(targetRect.left);
            this._overlayBlockL.style.height = px(targetRect.height);
        } else {
            this._overlayBlockT.style.width = '100vw';
            this._overlayBlockT.style.height = '100vh';
        }
    }

    private _showSvg() {
        this._block.classList.add(ClassNames.SHADOW_VISIBLE);
    }

    private _showOverlay() {
        this._overlayBlockT.classList.add(ClassNames.SHADOW_VISIBLE);
        this._overlayBlockR.classList.add(ClassNames.SHADOW_VISIBLE);
        this._overlayBlockB.classList.add(ClassNames.SHADOW_VISIBLE);
        this._overlayBlockL.classList.add(ClassNames.SHADOW_VISIBLE);
    }

    private _hideSvg() {
        this._block.classList.remove(ClassNames.SHADOW_VISIBLE);
    }

    private _hideOverlay() {
        this._overlayBlockT.classList.remove(ClassNames.SHADOW_VISIBLE);
        this._overlayBlockR.classList.remove(ClassNames.SHADOW_VISIBLE);
        this._overlayBlockB.classList.remove(ClassNames.SHADOW_VISIBLE);
        this._overlayBlockL.classList.remove(ClassNames.SHADOW_VISIBLE);
    }

    private _createAnimation({ targetId, attribute, from, to, duration }) {
        const animation = document.createElement('animate');
        animation.setAttribute('xlink:href', targetId);
        animation.setAttribute('attributeName', attribute);
        animation.setAttribute('from', from);
        animation.setAttribute('to', to);
        animation.setAttribute('dur', duration);
        animation.setAttribute('fill', 'freeze');
        return animation;
    }

    private _resetAnimations() {
        Array.from(this._svgRoot.querySelectorAll('animate')).forEach(elem =>
            elem.remove()
        );
    }
}
