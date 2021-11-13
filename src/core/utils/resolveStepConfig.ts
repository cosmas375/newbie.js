import { INewbieConfig, IStepConfig } from "../helpers/Config";

export default function resolveStepConfig(stepConfig: IStepConfig, config: INewbieConfig) {
  if (!stepConfig.component) {
    stepConfig.component = config.component;
  }

  if (!stepConfig.shadow) {
    stepConfig.shadow = config.shadow;
  }

  return stepConfig;
}
