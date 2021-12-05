import { IHintConfig } from '../Config';
import { SimpleHint } from './SimpleHint';
import { VueHint } from './VueHint';

export interface IHint {
  mount(targetElement: HTMLElement): void;
  unmount(): void;
  setContent(content: string): void;
}

export interface IHintFactory {
  create(settings: IHintConfig): IHint;
}

export class VanillaHintFactory implements IHintFactory {
  public create(settings): IHint {
    return new SimpleHint(settings);
  }
}

export class VueHintFactory implements IHintFactory {
  private _vue;

  constructor({ Vue }) {
    this._vue = Vue;
  }

  public create(settings): IHint {
    return new VueHint(settings, { Vue: this._vue });
  }
}
