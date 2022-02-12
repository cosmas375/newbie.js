import { ClassNames } from '../../ClassName';
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

    private _container: HTMLElement;
    private _slot: HTMLElement;
    private _resizeCallback: any;

    constructor(settings: object) {
        this._createComponents(settings);
        this._resizeCallback = debounce(this._updatePosition.bind(this)).bind(
            this
        );
    }

    public mount(config): void {
        document.body.append(this._container);

        this._targetElement = config.targetElement;
        this._position = config.position;
        this._offsetX = config.offsetX;
        this._offsetY = config.offsetY;

        this._updatePosition();

        window.addEventListener('resize', this._resizeCallback);
    }

    public unmount(): void {
        this._container.remove();

        window.removeEventListener('resize', this._resizeCallback);
    }

    public append(elem: HTMLElement): void {
        if (!elem) {
            return;
        }
        this._slot.append(elem);
    }

    private _createComponents(settings: any) {
        const wrap = document.createElement('div');
        wrap.classList.add(ClassNames.HINT_WRAP);
        wrap.style.transitionDuration = getTransitionDuration(
            settings.transitionDuration
        );
        const inner = document.createElement('div');
        inner.classList.add(ClassNames.HINT_WRAP_INNER);
        wrap.append(inner);

        this._container = wrap;
        this._slot = inner;
    }

    private _updatePosition() {
        if (!this._targetElement) {
            this._container.style.alignItems = 'center';
            this._container.style.justifyContent = 'center';
            setPosition(this._container, {
                top: px(
                    document.documentElement.scrollTop + window.innerHeight / 2
                ),
                left: px(window.innerWidth / 2),
            });
            setPosition(this._slot, {});
            return;
        }

        const targetRect = this._targetElement.getBoundingClientRect();

        this._container.style.position = 'absolute';

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
