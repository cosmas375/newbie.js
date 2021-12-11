import { IConfig, INewbieSettings, IStepSettings } from "../Interfaces";


export class Config implements IConfig {
  private _config: INewbieSettings;

  constructor(config: INewbieSettings) {
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
      stepConfig.shadow = config.shadow || { type: null };
    }
    if (typeof stepConfig.shadow.type === 'undefined') {
      stepConfig.shadow.type = config.shadow.type;
    }
    if (!stepConfig.shadow && config.shadow.type === stepConfig.shadow.type) {
      stepConfig.shadow = config.shadow;
    }
    if (!stepConfig.shadow) {
      stepConfig.shadow = {};
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
