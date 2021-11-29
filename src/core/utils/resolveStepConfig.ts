import { INewbieConfig, IStepConfig } from "../helpers/Config";

export default function resolveStepConfig(stepConfig: IStepConfig, config: INewbieConfig) {
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
    stepConfig.hint = config.hint || { component: null };
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
