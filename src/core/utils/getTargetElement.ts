export default function getTargetElement(payload): HTMLElement {
  const element = typeof payload === 'string'
    ? document.querySelector(payload)
    : payload;
  return element || null;
}
