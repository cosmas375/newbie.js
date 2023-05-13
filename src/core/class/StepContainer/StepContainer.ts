import { ClassName } from '../../ClassName';
import { DEFAULT_VALUES } from '../../DefaultValues';
import { TElement, TOffset, TTargetElement } from '../../Interfaces';
import { Position } from '../../Position';
import debounce from '../../utils/debounce';
import getTransitionDuration from '../../utils/getTransitionDuration';
import px from '../../utils/px';
import { setPosition } from '../../utils/setPosition';

export class StepContainer {
    private _targetElement: TTargetElement = null;
    private _position: Position = DEFAULT_VALUES.position;
    private _offsetX: TOffset = DEFAULT_VALUES.offsetX;
    private _offsetY: TOffset = DEFAULT_VALUES.offsetY;
    private _arrowPadding: TOffset = DEFAULT_VALUES.arrow.padding;

    private _wrap: TElement;
    private _container: TElement;
    private _hintSlot: TElement;
    private _arrowSlot: TElement;
    private _resizeCallback: any;

    constructor(settings: object) {
        const { wrap, container, arrowSlot, hintSlot } =
            this._createComponents(settings);
        this._wrap = wrap;
        this._container = container;
        this._arrowSlot = arrowSlot;
        this._hintSlot = hintSlot;

        this._resizeCallback = debounce(this._updatePosition).bind(this);
        document.body.append(this._wrap);
    }

    public mount(config: {
        targetElement: TElement | null;
        position: Position;
        offsetX: TOffset;
        offsetY: TOffset;
        arrowPadding: TOffset;
    }): void {
        this._wrap.classList.add(ClassName.HINT_WRAP_VISIBLE);

        this._targetElement = config.targetElement;
        this._position = config.position;
        this._offsetX = config.offsetX;
        this._offsetY = config.offsetY;
        this._arrowPadding = config.arrowPadding;

        this._updatePosition();

        window.addEventListener('resize', this._resizeCallback);
    }

    public unmount(): void {
        this._wrap.classList.remove(ClassName.HINT_WRAP_VISIBLE);

        window.removeEventListener('resize', this._resizeCallback);
    }

    public appendHint(elem: TElement): void {
        this._appendToSlot(elem, this._hintSlot);
    }

    public appendArrow(elem: TElement): void {
        this._appendToSlot(elem, this._arrowSlot);
    }

    private _appendToSlot(elem: TElement, slot: TElement): void {
        if (!elem) {
            return;
        }
        slot.append(elem);
    }

    private _createComponents(settings: any) {
        const wrap = document.createElement('div');
        wrap.classList.add(ClassName.HINT_WRAP);
        wrap.style.transitionDuration = getTransitionDuration(
            settings.transitionDuration
        );

        const container = document.createElement('div');
        container.classList.add(ClassName.HINT_WRAP_CONTAINER);
        container.style.transitionDuration = getTransitionDuration(
            settings.transitionDuration
        );
        wrap.append(container);

        const hintSlot = document.createElement('div');
        hintSlot.classList.add(ClassName.HINT_WRAP_HINT);
        container.append(hintSlot);

        const arrowSlot = document.createElement('div');
        arrowSlot.classList.add(ClassName.HINT_WRAP_ARROW);
        arrowSlot.style.transitionDuration = getTransitionDuration(
            settings.transitionDuration
        );
        hintSlot.append(arrowSlot);

        return {
            wrap,
            container,
            arrowSlot,
            hintSlot,
        };
    }

    private _updatePosition() {
        const hintRect = this._hintSlot.getBoundingClientRect();
        const hintWidth = hintRect.width;
        const hintHeight = hintRect.height;

        const arrowRect = this._arrowSlot.getBoundingClientRect();
        const arrowWidth = arrowRect.width;
        const arrowHeight = arrowRect.height;

        if (!this._targetElement) {
            setPosition(this._wrap, {
                top: px(
                    document.documentElement.scrollTop + window.innerHeight / 2
                ),
                left: px(
                    document.documentElement.scrollLeft + window.innerWidth / 2
                ),
            });
            setPosition(this._container, {
                top: px(-hintHeight / 2),
                left: px(-hintWidth / 2),
            });
            return;
        }

        const targetRect = this._targetElement.getBoundingClientRect();

        switch (this._position) {
            case Position.Top:
            default:
                setPosition(this._wrap, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.top -
                            arrowHeight +
                            this._offsetY
                    ),
                    left: px(
                        document.documentElement.scrollLeft +
                            targetRect.left +
                            targetRect.width / 2 +
                            this._offsetX
                    ),
                });
                setPosition(this._container, {
                    top: px(-hintHeight),
                    left: px(-hintWidth / 2),
                });
                setPosition(this._arrowSlot, {
                    top: px(hintHeight),
                    left: px(hintWidth / 2 - arrowWidth / 2),
                });
                this._arrowSlot.style.transform = 'rotate(180deg)';
                break;
            case Position.TopLeft:
                setPosition(this._wrap, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.top -
                            arrowHeight +
                            this._offsetY
                    ),
                    left: px(
                        document.documentElement.scrollLeft +
                            targetRect.left +
                            this._offsetX
                    ),
                });
                setPosition(this._container, {
                    top: px(-hintHeight),
                    left: px(0),
                });
                setPosition(this._arrowSlot, {
                    top: px(hintHeight),
                    left: px(0 + this._arrowPadding),
                });
                this._arrowSlot.style.transform = 'rotate(180deg)';
                break;
            case Position.TopRight:
                setPosition(this._wrap, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.top -
                            arrowHeight +
                            this._offsetY
                    ),
                    left: px(
                        document.documentElement.scrollLeft +
                            targetRect.right +
                            this._offsetX
                    ),
                });
                setPosition(this._container, {
                    top: px(-hintHeight),
                    left: px(-hintWidth),
                });
                setPosition(this._arrowSlot, {
                    top: px(hintHeight),
                    left: px(hintWidth - arrowWidth - this._arrowPadding),
                });
                this._arrowSlot.style.transform = 'rotate(180deg)';
                break;
            case Position.Right:
                setPosition(this._wrap, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.top +
                            targetRect.height / 2 +
                            this._offsetY
                    ),
                    left: px(
                        document.documentElement.scrollLeft +
                            targetRect.right +
                            arrowWidth +
                            this._offsetX
                    ),
                });
                setPosition(this._container, {
                    top: px(-hintHeight / 2),
                    left: px(0),
                });
                setPosition(this._arrowSlot, {
                    top: px(hintHeight / 2 - arrowWidth / 2),
                    left: px(-arrowWidth),
                });
                this._arrowSlot.style.transform = 'rotate(270deg)';
                break;
            case Position.RightTop:
                setPosition(this._wrap, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.top +
                            this._offsetY
                    ),
                    left: px(
                        document.documentElement.scrollLeft +
                            targetRect.right +
                            arrowWidth +
                            this._offsetX
                    ),
                });
                setPosition(this._container, {
                    top: px(0),
                    left: px(0),
                });
                setPosition(this._arrowSlot, {
                    top: px(this._arrowPadding),
                    left: px(-arrowWidth),
                });
                this._arrowSlot.style.transform = 'rotate(270deg)';
                break;
            case Position.RightBottom:
                setPosition(this._wrap, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.bottom +
                            this._offsetY
                    ),
                    left: px(
                        document.documentElement.scrollLeft +
                            targetRect.right +
                            arrowWidth +
                            this._offsetX
                    ),
                });
                setPosition(this._container, {
                    top: px(-hintHeight),
                    left: px(0),
                });
                setPosition(this._arrowSlot, {
                    top: px(hintHeight - arrowHeight - this._arrowPadding),
                    left: px(-arrowWidth),
                });
                this._arrowSlot.style.transform = 'rotate(270deg)';
                break;
            case Position.Bottom:
                setPosition(this._wrap, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.bottom +
                            arrowHeight +
                            this._offsetY
                    ),
                    left: px(
                        document.documentElement.scrollLeft +
                            targetRect.left +
                            targetRect.width / 2 +
                            this._offsetX
                    ),
                });
                setPosition(this._container, {
                    top: px(0),
                    left: px(-hintWidth / 2),
                });
                setPosition(this._arrowSlot, {
                    top: px(-arrowHeight),
                    left: px(hintWidth / 2 - arrowWidth / 2),
                });
                this._arrowSlot.style.transform = 'rotate(0deg)';
                break;
            case Position.BottomLeft:
                setPosition(this._wrap, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.bottom +
                            arrowHeight +
                            this._offsetY
                    ),
                    left: px(
                        document.documentElement.scrollLeft +
                            targetRect.left +
                            this._offsetX
                    ),
                });
                setPosition(this._container, {
                    top: px(0),
                    left: px(0),
                });
                setPosition(this._arrowSlot, {
                    top: px(-arrowHeight),
                    left: px(this._arrowPadding),
                });
                this._arrowSlot.style.transform = 'rotate(0deg)';
                break;
            case Position.BottomRight:
                setPosition(this._wrap, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.bottom +
                            arrowHeight +
                            this._offsetY
                    ),
                    left: px(
                        document.documentElement.scrollLeft +
                            targetRect.left +
                            targetRect.width +
                            this._offsetX
                    ),
                });
                setPosition(this._container, {
                    top: px(0),
                    left: px(-hintWidth),
                });
                setPosition(this._arrowSlot, {
                    top: px(-arrowHeight),
                    left: px(hintWidth - arrowWidth - this._arrowPadding),
                });
                this._arrowSlot.style.transform = 'rotate(0deg)';
                break;
            case Position.Left:
                setPosition(this._wrap, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.top +
                            targetRect.height / 2 +
                            this._offsetY
                    ),
                    left: px(
                        document.documentElement.scrollLeft +
                            targetRect.left -
                            arrowWidth +
                            this._offsetX
                    ),
                });
                setPosition(this._container, {
                    top: px(-hintHeight / 2),
                    left: px(-hintWidth),
                });
                setPosition(this._arrowSlot, {
                    top: px(hintHeight / 2 - arrowWidth / 2),
                    left: px(hintWidth),
                });
                this._arrowSlot.style.transform = 'rotate(90deg)';
                break;
            case Position.LeftTop:
                setPosition(this._wrap, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.top +
                            this._offsetY
                    ),
                    left: px(
                        document.documentElement.scrollLeft +
                            targetRect.left -
                            arrowWidth +
                            this._offsetX
                    ),
                });
                setPosition(this._container, {
                    top: px(0),
                    left: px(-hintWidth),
                });
                setPosition(this._arrowSlot, {
                    top: px(this._arrowPadding),
                    left: px(hintWidth),
                });
                this._arrowSlot.style.transform = 'rotate(90deg)';
                break;
            case Position.LeftBottom:
                setPosition(this._wrap, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.bottom +
                            this._offsetY
                    ),
                    left: px(
                        document.documentElement.scrollLeft +
                            targetRect.left -
                            arrowWidth +
                            this._offsetX
                    ),
                });
                setPosition(this._container, {
                    top: px(-hintHeight),
                    left: px(-hintWidth),
                });
                setPosition(this._arrowSlot, {
                    top: px(hintHeight - arrowHeight - this._arrowPadding),
                    left: px(hintWidth),
                });
                this._arrowSlot.style.transform = 'rotate(90deg)';
                break;
        }
    }
}
