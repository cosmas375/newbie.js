import { ClassNames, Position } from '../Interfaces';
import px from '../utils/px';

export class StepContainer {
    private _position: Position;
    private _offsetX: number;
    private _offsetY: number;

    private _container: HTMLElement;
    private _slot: HTMLElement;

    constructor({ position, offsetX, offsetY }) {
        this._position = position;
        this._offsetX = offsetX;
        this._offsetY = offsetY;

        this._createComponents();
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

    private _createComponents() {
        const wrap = document.createElement('div');
        wrap.classList.add(ClassNames.HINT_WRAP);
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
                this._container.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top -
                        this._offsetY
                );
                this._container.style.left = px(
                    targetRect.left + targetRect.width / 2
                );
                this._container.style.alignItems = 'center';
                this._container.style.justifyContent = 'center';
                this._slot.style.bottom = px(0);
                break;
            case Position.TopLeft:
                this._container.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top -
                        this._offsetY
                );
                this._container.style.left = px(targetRect.left);
                this._container.style.alignItems = 'center';
                this._container.style.justifyContent = 'flex-start';
                this._slot.style.bottom = px(0);
                this._slot.style.left = px(0);
                break;
            case Position.TopRight:
                this._container.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top -
                        this._offsetY
                );
                this._container.style.left = px(
                    targetRect.left + targetRect.width
                );
                this._container.style.alignItems = 'center';
                this._container.style.justifyContent = 'flex-end';
                this._slot.style.bottom = px(0);
                this._slot.style.right = px(0);
                break;
            case Position.Right:
                this._container.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height / 2
                );
                this._container.style.left = px(
                    targetRect.left + targetRect.width + this._offsetX
                );
                this._container.style.alignItems = 'center';
                this._container.style.justifyContent = 'flex-start';
                this._slot.style.left = px(0);
                break;
            case Position.RightTop:
                this._container.style.top = px(
                    document.documentElement.scrollTop + targetRect.top
                );
                this._container.style.left = px(
                    targetRect.left + targetRect.width + this._offsetX
                );
                this._container.style.alignItems = 'flex-start';
                this._container.style.justifyContent = 'flex-start';
                this._slot.style.left = px(0);
                this._slot.style.top = px(0);
                break;
            case Position.RightBottom:
                this._container.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height
                );
                this._container.style.left = px(
                    targetRect.left + targetRect.width + this._offsetX
                );
                this._slot.style.alignItems = 'flex-end';
                this._slot.style.justifyContent = 'flex-start';
                this._slot.style.left = px(0);
                this._slot.style.bottom = px(0);
                break;
            case Position.Bottom:
                this._container.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height +
                        this._offsetY
                );
                this._container.style.left = px(
                    targetRect.left + targetRect.width / 2
                );
                this._container.style.alignItems = 'flex-start';
                this._container.style.justifyContent = 'center';
                this._slot.style.top = px(0);
                break;
            case Position.BottomLeft:
                this._container.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height +
                        this._offsetY
                );
                this._container.style.left = px(targetRect.left);
                this._container.style.alignItems = 'flex-start';
                this._container.style.justifyContent = 'flex-start';
                this._slot.style.top = px(0);
                this._slot.style.left = px(0);
                break;
            case Position.BottomRight:
                this._container.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height +
                        this._offsetY
                );
                this._container.style.left = px(
                    targetRect.left + targetRect.width
                );
                this._container.style.alignItems = 'flex-start';
                this._container.style.justifyContent = 'flex-end';
                this._slot.style.top = px(0);
                this._slot.style.right = px(0);
                break;
            case Position.Left:
                this._container.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height / 2
                );
                this._container.style.left = px(
                    targetRect.left - this._offsetX
                );
                this._container.style.alignItems = 'center';
                this._container.style.justifyContent = 'flex-end';
                this._slot.style.right = px(0);
                break;
            case Position.LeftTop:
                this._container.style.top = px(
                    document.documentElement.scrollTop + targetRect.top
                );
                this._container.style.left = px(
                    targetRect.left - this._offsetX
                );
                this._container.style.alignItems = 'flex-start';
                this._container.style.justifyContent = 'flex-end';
                this._slot.style.right = px(0);
                this._slot.style.top = px(0);
                break;
            case Position.LeftBottom:
                this._container.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height
                );
                this._container.style.left = px(
                    targetRect.left - this._offsetX
                );
                this._container.style.alignItems = 'flex-end';
                this._container.style.justifyContent = 'flex-end';
                this._slot.style.right = px(0);
                this._slot.style.bottom = px(0);
                break;
        }
    }
}
