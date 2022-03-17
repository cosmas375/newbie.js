import { IArrow, IArrowConfig } from '../../Interfaces';
import { ClassNames } from '../../ClassName';
import px from '../../utils/px';

export class TriangleArrow implements IArrow {
    private _component: HTMLElement;

    constructor() {
        this._createElement();
    }

    public mount(config: IArrowConfig) {
        this._updateSize(config.size);
        this._updateColor(config.color);
        this._show();
        return this._component;
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
        this._component.style.borderBottomWidth = px(size);
        this._component.style.borderLeftWidth = px(size / 2);
        this._component.style.borderRightWidth = px(size / 2);
    }

    private _updateColor(color: string) {
        this._component.style.borderBottomColor = color;
    }
}
