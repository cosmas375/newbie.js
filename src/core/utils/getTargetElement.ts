import { TTarget } from "../model/Step";

export default function getTargetElement(payload: TTarget): Element {
  const element = typeof payload === 'string'
    ? document.querySelector(payload)
    : payload;
  return element || null;
}
