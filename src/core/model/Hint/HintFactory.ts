import { SimpleHint } from './SimpleHint';

export interface IHint {
  mount(targetElement: HTMLElement): void;
  unmount(): void;
  setContent(content: string): void;
}

export class HintFactory {
  public static create(settings): IHint {
    return new SimpleHint(settings);
  }
}
