import { ClassNames, IArrow, IArrowConfg, Position } from '../../Interfaces';
import px from '../../utils/px';

export class TriangleArrow implements IArrow {
    private _position: Position;
    private _size: number;
    private _color: string;
    private _offsetX: number;
    private _offsetY: number;
    private _component: HTMLElement;

    constructor(config: IArrowConfg) {
        this._position = config.position;
        this._size = config.size || 8;
        this._color = config.color || '#ffffff';

        const halfOfArrowWidth = (this._size * Math.sqrt(2)) / 2; // diagonal of a square divided by 2
        this._offsetX = Math.max(halfOfArrowWidth, config.offsetX || 10);
        this._offsetY = Math.max(halfOfArrowWidth, config.offsetY || 10);
    }

    public get elem() {
        return this._component;
    }

    public mount(): void {
        const component = document.createElement('div');
        component.classList.add(ClassNames.ARROW);
        component.style.width = px(this._size * 2);
        component.style.height = px(this._size * 2);
        component.style.backgroundColor = this._color;

        switch (this._position) {
            case Position.Top:
                component.style.bottom = px(-this._size);
                break;
            case Position.TopLeft:
                component.style.bottom = px(-this._size);
                component.style.left = px(this._offsetX);
                break;
            case Position.TopRight:
                component.style.bottom = px(-this._size);
                component.style.right = px(this._offsetX);
                break;

            case Position.Right:
                component.style.left = px(-this._size);
                break;
            case Position.RightTop:
                component.style.left = px(-this._size);
                component.style.top = px(this._offsetY);
                break;
            case Position.RightBottom:
                component.style.left = px(-this._size);
                component.style.bottom = px(this._offsetY);
                break;

            case Position.Bottom:
                component.style.top = px(-this._size);
                break;
            case Position.BottomLeft:
                component.style.top = px(-this._size);
                component.style.left = px(this._offsetX);
                break;
            case Position.BottomRight:
                component.style.top = px(-this._size);
                component.style.right = px(this._offsetX);
                break;

            case Position.Left:
                component.style.right = px(-this._size);
                break;
            case Position.LeftTop:
                component.style.right = px(-this._size);
                component.style.top = px(this._offsetY);
                break;
            case Position.LeftBottom:
                component.style.right = px(-this._size);
                component.style.bottom = px(this._offsetY);
                break;
        }

        this._component = component;
    }

    public unmount(): void {
        this._component.remove();
    }
}
