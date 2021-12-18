import { ClassNames, IHint, Position } from '../../Interfaces';
import px from '../../utils/px';

export class Hint implements IHint {
    private _position: Position;
    private _offsetX: number;
    private _offsetY: number;
    private _targetElement: HTMLElement;
    private _hintWrap: HTMLElement;
    private _slotForHint: HTMLElement;

    constructor(settings) {
        this._position = settings.position || Position.Top;
        this._offsetX = settings.offsetX || 10;
        this._offsetY = settings.offsetY || 10;
    }

    public mount(targetElement) {
        this._targetElement = targetElement;
        this._mountWrapComponent();
    }

    public unmount() {
        this._hintWrap.remove();
    }

    public setContent() {}

    private _mountWrapComponent() {
        const wrap = document.createElement('div');
        wrap.classList.add(ClassNames.HINT_WRAP);
        const inner = document.createElement('div');
        inner.classList.add(ClassNames.HINT_WRAP_INNER);
        wrap.append(inner);

        const targetRect = this._targetElement.getBoundingClientRect();
        const offsetY = this._offsetY;
        const offsetX = this._offsetX;

        switch (this._position) {
            case Position.Top:
            default:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top -
                        offsetY
                );
                wrap.style.left = px(targetRect.left + targetRect.width / 2);
                wrap.style.alignItems = 'center';
                wrap.style.justifyContent = 'center';
                inner.style.bottom = px(0);
                break;
            case Position.TopLeft:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top -
                        offsetY
                );
                wrap.style.left = px(targetRect.left);
                wrap.style.alignItems = 'center';
                wrap.style.justifyContent = 'flex-start';
                inner.style.bottom = px(0);
                inner.style.left = px(0);
                break;
            case Position.TopRight:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top -
                        offsetY
                );
                wrap.style.left = px(targetRect.left + targetRect.width);
                wrap.style.alignItems = 'center';
                wrap.style.justifyContent = 'flex-end';
                inner.style.bottom = px(0);
                inner.style.right = px(0);
                break;
            case Position.Right:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height / 2
                );
                wrap.style.left = px(
                    targetRect.left + targetRect.width + offsetX
                );
                wrap.style.alignItems = 'center';
                wrap.style.justifyContent = 'flex-start';
                inner.style.left = px(0);
                break;
            case Position.RightTop:
                wrap.style.top = px(
                    document.documentElement.scrollTop + targetRect.top
                );
                wrap.style.left = px(
                    targetRect.left + targetRect.width + offsetX
                );
                wrap.style.alignItems = 'flex-start';
                wrap.style.justifyContent = 'flex-start';
                inner.style.left = px(0);
                inner.style.top = px(0);
                break;
            case Position.RightBottom:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height
                );
                wrap.style.left = px(
                    targetRect.left + targetRect.width + offsetX
                );
                inner.style.alignItems = 'flex-end';
                inner.style.justifyContent = 'flex-start';
                inner.style.left = px(0);
                inner.style.bottom = px(0);
                break;
            case Position.Bottom:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height +
                        offsetY
                );
                wrap.style.left = px(targetRect.left + targetRect.width / 2);
                wrap.style.alignItems = 'flex-start';
                wrap.style.justifyContent = 'center';
                inner.style.top = px(0);
                break;
            case Position.BottomLeft:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height +
                        offsetY
                );
                wrap.style.left = px(targetRect.left);
                wrap.style.alignItems = 'flex-start';
                wrap.style.justifyContent = 'flex-start';
                inner.style.top = px(0);
                inner.style.left = px(0);
                break;
            case Position.BottomRight:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height +
                        offsetY
                );
                wrap.style.left = px(targetRect.left + targetRect.width);
                wrap.style.alignItems = 'flex-start';
                wrap.style.justifyContent = 'flex-end';
                inner.style.top = px(0);
                inner.style.right = px(0);
                break;
            case Position.Left:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height / 2
                );
                wrap.style.left = px(targetRect.left - offsetX);
                wrap.style.alignItems = 'center';
                wrap.style.justifyContent = 'flex-end';
                inner.style.right = px(0);
                break;
            case Position.LeftTop:
                wrap.style.top = px(
                    document.documentElement.scrollTop + targetRect.top
                );
                wrap.style.left = px(targetRect.left - offsetX);
                wrap.style.alignItems = 'flex-start';
                wrap.style.justifyContent = 'flex-end';
                inner.style.right = px(0);
                inner.style.top = px(0);
                break;
            case Position.LeftBottom:
                wrap.style.top = px(
                    document.documentElement.scrollTop +
                        targetRect.top +
                        targetRect.height
                );
                wrap.style.left = px(targetRect.left - offsetX);
                wrap.style.alignItems = 'flex-end';
                wrap.style.justifyContent = 'flex-end';
                inner.style.right = px(0);
                inner.style.bottom = px(0);
                break;
        }

        document.body.append(wrap);
        this._hintWrap = wrap;
        this._slotForHint = inner;
    }

    protected _mountHint(component) {
        this._slotForHint.append(component);
    }

    protected _show() {
        this._hintWrap.classList.add(ClassNames.HINT_WRAP_VISIBLE);
    }
    protected _hide() {
        this._hintWrap.classList.remove(ClassNames.HINT_WRAP_VISIBLE);
    }
}
