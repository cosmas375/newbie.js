import { ClassNames } from '../../ClassName';
import { IStepConfig } from '../../Interfaces';
import { Position } from '../../Position';
import debounce from '../../utils/debounce';
import getTransitionDuration from '../../utils/getTransitionDuration';
import px from '../../utils/px';
import setPosition from '../../utils/setPosition';

export class StepContainer {
    private _targetElement: HTMLElement;
    private _position: Position;
    private _offsetX: number;
    private _offsetY: number;
    private _arrowPadding: number;

    private _wrap: HTMLElement;
    private _container: HTMLElement;
    private _hintSlot: HTMLElement;
    private _arrowSlot: HTMLElement;
    private _resizeCallback: any;

    constructor(settings: object) {
        this._createComponents(settings);
        this._resizeCallback = debounce(this._updatePosition.bind(this)).bind(
            this
        );
        document.body.append(this._wrap);
    }

    public mount(config): void {
        this._wrap.classList.add(ClassNames.HINT_WRAP_VISIBLE);

        this._targetElement = config.targetElement;
        this._position = config.position;
        this._offsetX = config.offsetX;
        this._offsetY = config.offsetY;
        this._arrowPadding = config.arrowPadding;

        this._updatePosition();

        window.addEventListener('resize', this._resizeCallback);
    }

    public unmount(): void {
        this._wrap.classList.remove(ClassNames.HINT_WRAP_VISIBLE);

        window.removeEventListener('resize', this._resizeCallback);
    }

    public appendHint(elem: HTMLElement): void {
        this._appendToSlot(elem, this._hintSlot);
    }

    public appendArrow(elem: HTMLElement): void {
        this._appendToSlot(elem, this._arrowSlot);
    }

    private _appendToSlot(elem: HTMLElement, slot: HTMLElement): void {
        if (!elem) {
            return;
        }
        slot.append(elem);
    }

    private _createComponents(settings: any) {
        const wrap = document.createElement('div');
        wrap.classList.add(ClassNames.HINT_WRAP);
        wrap.style.transitionDuration = getTransitionDuration(
            settings.transitionDuration
        );

        const container = document.createElement('div');
        container.classList.add(ClassNames.HINT_WRAP_CONTAINER);
        container.style.transitionDuration = getTransitionDuration(
            settings.transitionDuration
        );
        wrap.append(container);

        const hintSlot = document.createElement('div');
        hintSlot.classList.add(ClassNames.HINT_WRAP_HINT);
        container.append(hintSlot);

        const arrowSlot = document.createElement('div');
        arrowSlot.classList.add(ClassNames.HINT_WRAP_ARROW);
        arrowSlot.style.transitionDuration = getTransitionDuration(
            settings.transitionDuration
        );
        hintSlot.append(arrowSlot);

        this._wrap = wrap;
        this._container = container;
        this._arrowSlot = arrowSlot;
        this._hintSlot = hintSlot;
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
                left: px(window.innerWidth / 2),
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
                        targetRect.left + targetRect.width / 2 + this._offsetX
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
                    left: px(targetRect.left + this._offsetX),
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
                    left: px(targetRect.right + this._offsetX),
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
                        targetRect.left +
                            targetRect.width +
                            arrowHeight +
                            this._offsetX
                    ),
                });
                setPosition(this._container, {
                    top: px(-hintHeight / 2),
                    left: px(0),
                });
                setPosition(this._arrowSlot, {
                    top: px(hintHeight / 2 - arrowWidth / 2),
                    left: px(-arrowHeight),
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
                    left: px(targetRect.right + arrowHeight + this._offsetX),
                });
                setPosition(this._container, {
                    top: px(0),
                    left: px(0),
                });
                setPosition(this._arrowSlot, {
                    top: px(this._arrowPadding),
                    left: px(-arrowHeight),
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
                    left: px(targetRect.right + arrowHeight + this._offsetX),
                });
                setPosition(this._container, {
                    top: px(-hintHeight),
                    left: px(0),
                });
                setPosition(this._arrowSlot, {
                    top: px(hintHeight - arrowHeight - this._arrowPadding),
                    left: px(-arrowHeight),
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
                        targetRect.left + targetRect.width / 2 + this._offsetX
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
                    left: px(targetRect.left + this._offsetX),
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
                        targetRect.left + targetRect.width + this._offsetX
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
                    left: px(targetRect.left - arrowHeight + this._offsetX),
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
                    left: px(targetRect.left - arrowHeight + this._offsetX),
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
                    left: px(targetRect.left - arrowHeight + this._offsetX),
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
