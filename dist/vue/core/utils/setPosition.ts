import isDefined from './isDefined';

export default (element: HTMLElement, position: any): void => {
    ['top', 'right', 'bottom', 'left'].forEach(side => {
        if (isDefined(position[side])) {
            element.style[side] = position[side];
        } else {
            element.style.removeProperty(side);
        }
    });
};
