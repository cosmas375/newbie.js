export interface IConfig {
  shadow: IShadowConfig,
  hint: IHintConfig,
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
  mounted(targetElement: HTMLElement): TStepCallback,
  beforeUnmount(targetElement: HTMLElement): TStepCallback,
  unmounted(): TStepCallback,
}

export interface IShadowConfig {
  type,
  settings: IShadowSettings,
}
export interface IHintConfig {
  component: HTMLElement,
  position?: Position,
}
export interface IShadowSettings {
  rootComponent?: HTMLElement,
  offset?: number,
}


export type TCallback = void;

export type TStepCallback = void;

export type TStepTarget = string | HTMLElement;

export enum Position {
  Top = 'top',
  TopLeft = 'top-left',
  TopRight = 'top-right',
  Right = 'right',
  RightTop = 'right-top',
  RightBottom = 'right-bottom',
  Bottom = 'bottom',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  Left = 'left',
  LeftTop = 'left-top',
  LeftBottom = 'left-bottom',
}
