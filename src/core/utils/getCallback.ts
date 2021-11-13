export default function getCallback(f) {
  return typeof f === 'function'
    ? f
    : () => {};
}
