import { TCallback } from '../Interfaces';
import _warn from './warn';

export default function getCallback(f?: TCallback): TCallback {
    if (typeof f !== 'function') {
        return async () => {};
    }

    return async (...args) => {
        try {
            return await f(...args);
        } catch (e) {
            _warn((e as Error).message);
        }
    };
}
