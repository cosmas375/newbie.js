import _warn from './warn';

export default function getCallback(f) {
    if (typeof f !== 'function') {
        return () => {};
    }

    return (...args) => {
        try {
            return f(...args);
        } catch (e) {
            _warn(e);
        }
    };
}
