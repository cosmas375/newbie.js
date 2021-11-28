import { TShadow } from '../model/Shadow';

export interface IConfig {
  component: HTMLElement,
  shadow: IShadowConfig,
}

export interface INewbieConfig extends IConfig {
  steps: IStepConfig[],
  beforeStart?(): TCallback;
  started?(): TCallback;
  beforeFinish?(): TCallback;
  finished?(): TCallback;
}

export interface IStepConfig extends IConfig {
  id: string,
  target: TStepTarget,
  content: string,
  position: TPosition,
  beforeMount(): TStepCallback,
  mounted(targetElement: HTMLElement): TStepCallback,
  beforeUnmount(targetElement: HTMLElement): TStepCallback,
  unmounted(): TStepCallback,
}

export interface IShadowConfig {
  type: TShadow,
  settings: IShadowSettings,
}
export interface IShadowSettings {
  rootComponent?: HTMLElement,
  offset?: number,
}


export type TCallback = void;

export type TStepCallback = void;

export type TStepTarget = string | HTMLElement;

export type TPosition = 'top' | 'left' | 'bottom' | 'right';
