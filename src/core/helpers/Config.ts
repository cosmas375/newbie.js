import { TShadow } from '../model/Shadow';

export interface IConfig {
  component: Element,
  shadow: TShadow,
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
  beforeMount(): TStepCallback,
  mounted(targetElement: Element): TStepCallback,
  beforeUnmount(targetElement: Element): TStepCallback,
  unmounted(): TStepCallback,
}


export type TCallback = void;

export type TStepCallback = void;

export type TStepTarget = string | Element;
