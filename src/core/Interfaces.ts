// classes
export interface INewbie {
  start(): void;
  stop(): void;
  goNext(): void;
  goPrevious(): void;
}

export interface IStep {
  mount(): void,
  unmount(): void,
}

export interface IConfig {
  validate(): (string | null);
  resolveStepConfig(stepId: string): IStepSettings,
}

export interface IHintFactory {
  create(settings: IHintSettings): IHint;
}

export interface IHint {
  mount(targetElement: Element): void;
  unmount(): void;
  setContent(content: (string | object)): void;
}

export interface IShadow {
  mount(target: Element): void;
  unmount(): void;
}

// settings
export interface ICommonSettings {
  shadow: IShadowSettings,
  hint: IHintSettings,
  steps: IStepSettings[],
}

export interface INewbieSettings extends ICommonSettings {
  steps: IStepSettings[],
  beforeStart?(): TNewbieCallbac;
  started?(): TNewbieCallbac;
  beforeFinish?(): TNewbieCallbac;
  finished?(): TNewbieCallbac;
}

export interface IStepSettings extends ICommonSettings {
  id: string,
  target: TStepTarget,
  content: string,
  beforeMount(): TStepCallback,
  mounted(targetElement: HTMLElement): TStepCallback,
  beforeUnmount(targetElement: HTMLElement): TStepCallback,
  unmounted(): TStepCallback,
}

export interface IShadowSettings {
  type?,
  rootComponent?: HTMLElement,
  offset?: number,
  borderRadius?: number,
}
export interface IHintSettings {
  component: HTMLElement,
  handlers: object,
  position?: Position,
}

export type TNewbieCallbac = void;

export type TStepCallback = void;

export type TStepTarget = HTMLElement;

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
