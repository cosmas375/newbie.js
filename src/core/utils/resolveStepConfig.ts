import { INewbieConfig, IStepConfig } from "../helpers/Config";

export default function resolveStepConfig(stepConfig: IStepConfig, config: INewbieConfig) {
  if (!stepConfig.component) {
    stepConfig.component = config.component;
  }

  // shadow
  if (!stepConfig.shadow) {
    stepConfig.shadow = config.shadow || { type: null, settings: {} };
  }
  if (!stepConfig.shadow.type && stepConfig.shadow.type !== null) {
    stepConfig.shadow.type = config.shadow.type;
  }
  if (!stepConfig.shadow.settings && config.shadow.type === stepConfig.shadow.type) {
    stepConfig.shadow.settings = config.shadow.settings;
  }
  if (!stepConfig.shadow.settings) {
    stepConfig.shadow.settings = {};
  }
  // end shadow

  return stepConfig;
}
