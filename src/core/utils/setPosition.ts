import { TElement } from '../Interfaces';
import { assertIsDefined } from './isDefined';

enum TAvailableCssProps {
    top = 'top',
    right = 'right',
    bottom = 'bottom',
    left = 'left',
}

export function setPosition(
    element: TElement,
    position: Partial<
        Record<keyof Pick<CSSStyleDeclaration, TAvailableCssProps>, string>
    >
): void {
    Object.values(TAvailableCssProps).forEach(side => {
        try {
            const positionData = position[side];
            assertIsDefined(positionData);
            element.style[side] = positionData;
        } catch {
            element.style.removeProperty(side);
        }
    });
}
