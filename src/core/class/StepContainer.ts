import { ClassNames, Position } from '../Interfaces';
import getTransitionDuration from '../utils/getTransitionDuration';
import px from '../utils/px';
import setPosition from '../utils/setPosition';

export class StepContainer {
    private _position: Position;
    private _offsetX: number;
    private _offsetY: number;

    private _container: HTMLElement;
    private _slot: HTMLElement;

    constructor(config) {
        this._createComponents(config);
    }

    public mount(targetElement): void {
        document.body.append(this._container);
        this._updatePosition(targetElement);
    }

    public unmount(): void {
        this._container.remove();
    }

    public show(): void {
        this._container.classList.add(ClassNames.HINT_WRAP_VISIBLE);
    }

    public hide(): void {
        this._container.classList.add(ClassNames.HINT_WRAP_VISIBLE);
    }

    public append(elem: HTMLElement): void {
        if (!elem) {
            return;
        }
        this._slot.append(elem);
    }

    public setPosition({ position, offsetX, offsetY }) {
        this._position = position;
        this._offsetX = offsetX;
        this._offsetY = offsetY;
    }

    private _createComponents({ transitionDuration }) {
        const wrap = document.createElement('div');
        wrap.classList.add(ClassNames.HINT_WRAP);
        wrap.style.transition = `all ${getTransitionDuration(
            transitionDuration
        )} linear`;
        const inner = document.createElement('div');
        inner.classList.add(ClassNames.HINT_WRAP_INNER);
        wrap.append(inner);

        this._container = wrap;
        this._slot = inner;
    }

    private _updatePosition(targetElement) {
        const targetRect = targetElement.getBoundingClientRect();

        switch (this._position) {
            case Position.Top:
            default:
                this._container.style.alignItems = 'center';
                this._container.style.justifyContent = 'center';
                setPosition(this._container, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.top -
                            this._offsetY
                    ),
                    left: px(targetRect.left + targetRect.width / 2),
                });
                setPosition(this._slot, {
                    bottom: px(0),
                });
                break;
            case Position.TopLeft:
                this._container.style.alignItems = 'center';
                this._container.style.justifyContent = 'flex-start';
                setPosition(this._container, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.top -
                            this._offsetY
                    ),
                    left: px(targetRect.left),
                });
                setPosition(this._slot, {
                    bottom: px(0),
                    left: px(0),
                });
                break;
            case Position.TopRight:
                this._container.style.alignItems = 'center';
                this._container.style.justifyContent = 'flex-end';
                setPosition(this._container, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.top -
                            this._offsetY
                    ),
                    left: px(targetRect.right),
                });
                setPosition(this._slot, {
                    bottom: px(0),
                    right: px(0),
                });
                break;
            case Position.Right:
                this._container.style.alignItems = 'center';
                this._container.style.justifyContent = 'flex-start';
                setPosition(this._container, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.top +
                            targetRect.height / 2
                    ),
                    left: px(
                        targetRect.left + targetRect.width + this._offsetX
                    ),
                });
                setPosition(this._slot, {
                    left: px(0),
                });
                break;
            case Position.RightTop:
                this._container.style.alignItems = 'flex-start';
                this._container.style.justifyContent = 'flex-start';
                setPosition(this._container, {
                    top: px(
                        document.documentElement.scrollTop + targetRect.top
                    ),
                    left: px(targetRect.right + this._offsetX),
                });
                setPosition(this._slot, {
                    top: px(0),
                    left: px(0),
                });
                break;
            case Position.RightBottom:
                this._slot.style.alignItems = 'flex-end';
                this._slot.style.justifyContent = 'flex-start';
                setPosition(this._container, {
                    top: px(
                        document.documentElement.scrollTop + targetRect.bottom
                    ),
                    left: px(targetRect.right + this._offsetX),
                });
                setPosition(this._slot, {
                    left: px(0),
                    bottom: px(0),
                });
                break;
            case Position.Bottom:
                this._container.style.alignItems = 'flex-start';
                this._container.style.justifyContent = 'center';
                setPosition(this._container, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.bottom +
                            this._offsetY
                    ),
                    left: px(targetRect.left + targetRect.width / 2),
                });
                setPosition(this._slot, {
                    top: px(0),
                });
                break;
            case Position.BottomLeft:
                this._container.style.alignItems = 'flex-start';
                this._container.style.justifyContent = 'flex-start';
                setPosition(this._container, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.bottom +
                            this._offsetY
                    ),
                    left: px(targetRect.left),
                });
                setPosition(this._slot, {
                    top: px(0),
                    left: px(0),
                });
                break;
            case Position.BottomRight:
                this._container.style.alignItems = 'flex-start';
                this._container.style.justifyContent = 'flex-end';
                setPosition(this._container, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.bottom +
                            this._offsetY
                    ),
                    left: px(targetRect.left + targetRect.width),
                });
                setPosition(this._slot, {
                    top: px(0),
                    right: px(0),
                });
                break;
            case Position.Left:
                this._container.style.alignItems = 'center';
                this._container.style.justifyContent = 'flex-end';
                setPosition(this._container, {
                    top: px(
                        document.documentElement.scrollTop +
                            targetRect.top +
                            targetRect.height / 2
                    ),
                    left: px(targetRect.left - this._offsetX),
                });
                setPosition(this._slot, {
                    right: px(0),
                });
                break;
            case Position.LeftTop:
                this._container.style.alignItems = 'flex-start';
                this._container.style.justifyContent = 'flex-end';
                setPosition(this._container, {
                    top: px(
                        document.documentElement.scrollTop + targetRect.top
                    ),
                    left: px(targetRect.left - this._offsetX),
                });
                setPosition(this._slot, {
                    top: px(0),
                    right: px(0),
                });
                break;
            case Position.LeftBottom:
                this._container.style.alignItems = 'flex-end';
                this._container.style.justifyContent = 'flex-end';
                setPosition(this._container, {
                    top: px(
                        document.documentElement.scrollTop + targetRect.bottom
                    ),
                    left: px(targetRect.left - this._offsetX),
                });
                setPosition(this._slot, {
                    bottom: px(0),
                    right: px(0),
                });
                break;
        }
    }
}
