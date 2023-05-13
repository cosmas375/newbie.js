export function assertIsDefined<T>(value?: T): asserts value is NonNullable<T> {
    if (typeof value === 'undefined') {
        throw new Error();
    }
}
