import { TCallback } from '../Interfaces';

export default function debounce(
    func: TCallback,
    wait = 50,
    immediate?: boolean
) {
    let timer: ReturnType<typeof setTimeout> | null;

    return function executedFunction(this: object) {
        const context = this;
        const args = arguments;

        const later = () => {
            timer = null;
            if (!immediate) {
                func.apply<object, any, void>(context, Array.from(args));
            }
        };

        const callNow = immediate && !timer;

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(later, wait);

        if (callNow) {
            func.apply<object, any, void>(context, Array.from(args));
        }
    };
}
