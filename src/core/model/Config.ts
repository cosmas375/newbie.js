export interface IConfig {
  validate(): (string | null);
  resolveStepConfig(stepId: string): IStepConfig,
}

export class Config implements IConfig {
  private _config: INewbieConfig;

  constructor(config: INewbieConfig) {
    this._config = config;
  }

  validate() {
    if (!Array.isArray(this._config.steps)) {
      return 'No steps provided!';
    }
    return null;
  }

  resolveStepConfig(stepId) {
    const stepConfig = this._config.steps.find(step => step.id === stepId);
    const config = this._config;

    // shadow
    if (!stepConfig.shadow) {
      stepConfig.shadow = config.shadow || { type: null, settings: {} };
    }
    if (typeof stepConfig.shadow.type === 'undefined') {
      stepConfig.shadow.type = config.shadow.type;
    }
    if (!stepConfig.shadow.settings && config.shadow.type === stepConfig.shadow.type) {
      stepConfig.shadow.settings = config.shadow.settings;
    }
    if (!stepConfig.shadow.settings) {
      stepConfig.shadow.settings = {};
    }
    // end shadow

    // hint
    if (!stepConfig.hint) {
      stepConfig.hint = config.hint || { component: null, handlers: {} };
    }
    if (typeof stepConfig.hint.handlers === 'undefined' && config.hint.handlers) {
      stepConfig.hint.handlers = config.hint.handlers;
    }
    if (typeof stepConfig.hint.component === 'undefined' && config.hint.component) {
      stepConfig.hint.component = config.hint.component;
    }
    if (typeof stepConfig.hint.position === 'undefined' && config.hint.position) {
      stepConfig.hint.position = config.hint.position;
    }
    // end hint

    return stepConfig;
  }
}

export interface ICommonConfig {
  shadow: IShadowConfig,
  hint: IHintConfig,
  steps: IStepConfig[],
}

export interface INewbieConfig extends ICommonConfig {
  steps: IStepConfig[],
  beforeStart?(): TCallback;
  started?(): TCallback;
  beforeFinish?(): TCallback;
  finished?(): TCallback;
}

export interface IStepConfig extends ICommonConfig {
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
  handlers: object,
  position?: Position,
}
export interface IShadowSettings {
  rootComponent?: HTMLElement,
  offset?: number,
}


export type TCallback = void;

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
