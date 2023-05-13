import { ClassName } from '../../ClassName';
import { IArrow, TArrowConfig, TElement } from '../../Interfaces';
import px from '../../utils/px';

export class TriangleArrow implements IArrow {
    private _element: TElement;

    constructor() {
        this._element = this._createElement();
    }

    public mount(config: TArrowConfig) {
        this._updateSize(config.size);
        this._updateColor(config.color);
        this._show();
        return this._element;
    }

    public unmount(): void {
        this._hide();
    }

    private _show() {
        if (!this._element) {
            return;
        }
        this._element.classList.add(ClassName.ARROW_VISIBLE);
    }
    private _hide() {
        if (!this._element) {
            return;
        }
        this._element.classList.remove(ClassName.ARROW_VISIBLE);
    }

    private _createElement(): TElement {
        const component = document.createElement('div');
        component.classList.add(ClassName.ARROW);
        return component;
    }

    private _updateSize(size: number = 0) {
        if (!this._element) {
            return;
        }
        this._element.style.borderBottomWidth = px(size);
        this._element.style.borderLeftWidth = px(size / 2);
        this._element.style.borderRightWidth = px(size / 2);
    }

    private _updateColor(color: string = '#ffffff') {
        if (!this._element) {
            return;
        }
        this._element.style.borderBottomColor = color;
    }
}
