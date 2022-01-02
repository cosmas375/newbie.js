import { IArrow, IArrowConfig } from '../../Interfaces';
import { ClassNames } from '../../ClassName';
import { Position } from '../../Position';
import setPosition from '../../utils/setPosition';
import px from '../../utils/px';

export class TriangleArrow implements IArrow {
    private _component: HTMLElement;

    constructor() {
        this._createElement();
    }

    public get elem() {
        return this._component;
    }

    public mount(config: IArrowConfig, settings: object): void {
        this._updateSize(config.size);
        this._updateColor(config.color);
        this._updatePosition(config, settings);
        this._show();
    }

    public unmount(): void {
        this._hide();
    }

    private _show() {
        this._component.classList.add(ClassNames.ARROW_VISIBLE);
    }

    private _hide() {
        this._component.classList.remove(ClassNames.ARROW_VISIBLE);
    }

    private _createElement() {
        const component = document.createElement('div');
        component.classList.add(ClassNames.ARROW);
        this._component = component;
    }

    private _updateSize(size: number) {
        this._component.style.width = px(size * 2);
        this._component.style.height = px(size * 2);
    }
    private _updateColor(color: string) {
        this._component.style.backgroundColor = color;
    }
    private _updatePosition(config: IArrowConfig, { hintRect, position }: any) {
        const size = config.size;
        const halfOfArrowWidth = (size * Math.sqrt(2)) / 2; // diagonal of a square divided by 2
        const offsetX = Math.max(halfOfArrowWidth, config.offsetX);
        const offsetY = Math.max(halfOfArrowWidth, config.offsetY);

        switch (position) {
            case Position.Top:
                setPosition(this._component, {
                    bottom: px(-size),
                    left: px(
                        Math.max(hintRect.width / 2 - halfOfArrowWidth, offsetX)
                    ),
                });
                break;
            case Position.TopLeft:
                setPosition(this._component, {
                    bottom: px(-size),
                    left: px(offsetX),
                });
                break;
            case Position.TopRight:
                setPosition(this._component, {
                    bottom: px(-size),
                    right: px(offsetX),
                });
                break;

            case Position.Right:
                setPosition(this._component, {
                    left: px(-size),
                    top: px(
                        Math.max(
                            hintRect.height / 2 - halfOfArrowWidth,
                            offsetY
                        )
                    ),
                });
                break;
            case Position.RightTop:
                setPosition(this._component, {
                    left: px(-size),
                    top: px(offsetY),
                });
                break;
            case Position.RightBottom:
                setPosition(this._component, {
                    left: px(-size),
                    bottom: px(offsetY),
                });
                break;

            case Position.Bottom:
                setPosition(this._component, {
                    top: px(-size),
                    left: px(
                        Math.max(hintRect.width / 2 - halfOfArrowWidth, offsetX)
                    ),
                });
                this._component.style.top = px(-size);
                break;
            case Position.BottomLeft:
                setPosition(this._component, {
                    top: px(-size),
                    left: px(offsetX),
                });
                break;
            case Position.BottomRight:
                setPosition(this._component, {
                    top: px(-size),
                    right: px(offsetX),
                });
                break;

            case Position.Left:
                setPosition(this._component, {
                    right: px(-size),
                    top: px(
                        Math.max(
                            hintRect.height / 2 - halfOfArrowWidth,
                            offsetY
                        )
                    ),
                });
                break;
            case Position.LeftTop:
                setPosition(this._component, {
                    right: px(-size),
                    top: px(offsetY),
                });
                break;
            case Position.LeftBottom:
                setPosition(this._component, {
                    right: px(-size),
                    bottom: px(offsetY),
                });
                break;
        }
    }
}
