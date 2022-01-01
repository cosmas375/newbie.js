import { ClassNames } from '../../ClassName';
import { Shadow } from './Shadow';
import px from '../../utils/px';

export class HtmlShadow extends Shadow {
    private _blockT: HTMLElement;
    private _blockR: HTMLElement;
    private _blockB: HTMLElement;
    private _blockL: HTMLElement;

    private _offset: number;

    constructor() {
        super();
    }

    public mount(config) {
        this._offset = config.offset || 0;
        super.mount(config);

        this._createElements();
        this._update(config.target);
        this._show();
    }

    public unmount() {
        super.unmount();

        this._hide();
        this._removeElements();
    }

    private _createElements() {
        this._blockT = document.createElement('div');
        this._blockR = document.createElement('div');
        this._blockB = document.createElement('div');
        this._blockL = document.createElement('div');

        this._blockT.classList.add(
            ClassNames.SHADOW,
            ClassNames.SHADOW_HTML,
            ClassNames.SHADOW_HTML_TOP
        );
        this._blockR.classList.add(
            ClassNames.SHADOW,
            ClassNames.SHADOW_HTML,
            ClassNames.SHADOW_HTML_RIGHT
        );
        this._blockB.classList.add(
            ClassNames.SHADOW,
            ClassNames.SHADOW_HTML,
            ClassNames.SHADOW_HTML_BOTTOM
        );
        this._blockL.classList.add(
            ClassNames.SHADOW,
            ClassNames.SHADOW_HTML,
            ClassNames.SHADOW_HTML_LEFT
        );

        this._rootComponent.append(this._blockT);
        this._rootComponent.append(this._blockR);
        this._rootComponent.append(this._blockB);
        this._rootComponent.append(this._blockL);
    }

    private _removeElements() {
        this._blockT.remove();
        this._blockR.remove();
        this._blockB.remove();
        this._blockL.remove();
    }

    private _update(target) {
        const targetRect = target.getBoundingClientRect();

        this._blockT.style.height = px(targetRect.top - this._offset);

        this._blockR.style.top = px(targetRect.top - this._offset);
        this._blockR.style.left = px(
            targetRect.left + targetRect.width + this._offset
        );
        this._blockR.style.width = px(
            window.innerWidth -
                (targetRect.left + targetRect.width + this._offset)
        );
        this._blockR.style.height = px(targetRect.height + 2 * this._offset);

        this._blockB.style.top = px(
            targetRect.top + targetRect.height + this._offset
        );
        this._blockB.style.height = px(
            window.innerHeight -
                (targetRect.top + targetRect.height + this._offset)
        );

        this._blockL.style.top = px(targetRect.top - this._offset);
        this._blockL.style.width = px(targetRect.left - this._offset);
        this._blockL.style.height = px(targetRect.height + 2 * this._offset);
    }

    private _show() {
        this._blockT.classList.add(ClassNames.SHADOW_VISIBLE);
        this._blockR.classList.add(ClassNames.SHADOW_VISIBLE);
        this._blockB.classList.add(ClassNames.SHADOW_VISIBLE);
        this._blockL.classList.add(ClassNames.SHADOW_VISIBLE);
    }

    private _hide() {
        this._blockT.classList.remove(ClassNames.SHADOW_VISIBLE);
        this._blockR.classList.remove(ClassNames.SHADOW_VISIBLE);
        this._blockB.classList.remove(ClassNames.SHADOW_VISIBLE);
        this._blockL.classList.remove(ClassNames.SHADOW_VISIBLE);
    }
}
