import { ClassName } from '../../ClassName';
import {
    TColor,
    TElement,
    TTargetElement,
    TValidShadowConfig,
} from '../../Interfaces';
import debounce from '../../utils/debounce';
import getTransitionDuration from '../../utils/getTransitionDuration';
import px from '../../utils/px';
import _warn from '../../utils/warn';
import { Shadow } from './Shadow';

export class SvgShadow extends Shadow {
    private _targetElement: TTargetElement = null;

    private _transitionDuration: number;

    private _block: TElement;
    private _svgRoot: TElement;
    private _svgRootId: string = 'shadow_root';
    private _maskId: string = 'shadow_mask';
    private _blackId: string = 'shadow_mask_black';
    private _shadowId: string = 'shadow';
    private _resizeCallback: any;

    private _overlayBlockT: TElement;
    private _overlayBlockR: TElement;
    private _overlayBlockB: TElement;
    private _overlayBlockL: TElement;

    private _x: string = '';
    private _y: string = '';
    private _width: string = '';
    private _height: string = '';
    private _rx: string = '';
    private _ry: string = '';
    private _color: TColor = '';

    constructor({ transitionDuration }: any) {
        super();
        this._transitionDuration = transitionDuration || 1;
        const { svg, block, topBlock, rightBlock, bottomBlock, leftBlock } =
            this._createElements();

        this._svgRoot = svg;
        this._block = block;

        this._overlayBlockT = topBlock;
        this._overlayBlockR = rightBlock;
        this._overlayBlockB = bottomBlock;
        this._overlayBlockL = leftBlock;
    }

    public mount(targetElement: TElement, config: TValidShadowConfig) {
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

    public reset() {
        this._x = '';
        this._y = '';
        this._width = '';
        this._height = '';
        this._rx = '';
        this._ry = '';
        this._color = '';
        this._resetAnimations();
    }

    private _createElements() {
        return {
            ...this._createSvgElements(),
            ...this._createOverlayElements(),
        };
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
        block.classList.add(ClassName.SHADOW);

        const svg = document.createElement('svg');
        svg.classList.add(ClassName.SHADOW_SVG);
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

        return {
            svg,
            block,
        };
    }

    private _createOverlayElements() {
        const topBlock = document.createElement('div');
        const rightBlock = document.createElement('div');
        const bottomBlock = document.createElement('div');
        const leftBlock = document.createElement('div');

        topBlock.classList.add(
            ClassName.SHADOW_OVERLAY,
            ClassName.SHADOW_OVERLAY_TOP
        );
        rightBlock.classList.add(
            ClassName.SHADOW_OVERLAY,
            ClassName.SHADOW_OVERLAY_RIGHT
        );
        bottomBlock.classList.add(
            ClassName.SHADOW_OVERLAY,
            ClassName.SHADOW_OVERLAY_BOTTOM
        );
        leftBlock.classList.add(
            ClassName.SHADOW_OVERLAY,
            ClassName.SHADOW_OVERLAY_LEFT
        );

        if (this._block) {
            this._block.append(topBlock, rightBlock, bottomBlock, leftBlock);
        }

        return {
            topBlock,
            rightBlock,
            bottomBlock,
            leftBlock,
        };
    }

    private _updateSvg() {
        const config = this._config;
        if (!config) {
            _warn('missing svg shadow config!');
            return;
        }
        const color = config.color;
        let x = '';
        let y = '';
        let width = '';
        let height = '';
        let rx = '';
        let ry = '';

        this._resetAnimations();

        if (this._targetElement) {
            const targetRect = this._targetElement.getBoundingClientRect();
            x = String(targetRect.left - config.offset);
            y = String(targetRect.top - config.offset);
            width = String(targetRect.width + 2 * config.offset);
            height = String(targetRect.height + 2 * config.offset);
            rx = String(config.borderRadius);
            ry = String(config.borderRadius);

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
        } else {
            this._svgRoot.append(
                this._createAnimation({
                    targetId: `#${this._shadowId}`,
                    attribute: 'fill',
                    from: this._color === null ? color : this._color,
                    to: color,
                    duration: getTransitionDuration(this._transitionDuration),
                })
            );
        }

        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._rx = rx;
        this._ry = ry;
        this._color = color;

        this._svgRoot.outerHTML += '';
        this._svgRoot = this._block.querySelector(
            `#${this._svgRootId}`
        ) as TElement;
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
        this._block.classList.add(ClassName.SHADOW_VISIBLE);
    }

    private _showOverlay() {
        this._overlayBlockT.classList.add(ClassName.SHADOW_VISIBLE);
        this._overlayBlockR.classList.add(ClassName.SHADOW_VISIBLE);
        this._overlayBlockB.classList.add(ClassName.SHADOW_VISIBLE);
        this._overlayBlockL.classList.add(ClassName.SHADOW_VISIBLE);
    }

    private _hideSvg() {
        this._block.classList.remove(ClassName.SHADOW_VISIBLE);
    }

    private _hideOverlay() {
        this._overlayBlockT.classList.remove(ClassName.SHADOW_VISIBLE);
        this._overlayBlockR.classList.remove(ClassName.SHADOW_VISIBLE);
        this._overlayBlockB.classList.remove(ClassName.SHADOW_VISIBLE);
        this._overlayBlockL.classList.remove(ClassName.SHADOW_VISIBLE);
    }

    private _createAnimation({
        targetId,
        attribute,
        from,
        to,
        duration,
    }: {
        targetId: string;
        attribute: string;
        from: string;
        to: string;
        duration: string;
    }) {
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
