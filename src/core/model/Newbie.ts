import { IStep, TStepConfig, Step } from './Step';
import { IList, INode, List } from '../helpers/List';
import validateConfig from '../utils/validateConfig';
import getCallback from '../utils/getCallback';
import _throw from '../utils/throw';

export class Newbie {
  private _steps: IList<IStep>;

  private _beforeStart(): TCallback {};
  private _started(): TCallback {};
  private _beforeFinish(): TCallback {};
  private _finished(): TCallback {};

  private _onError(err?: TError): TCallback {};

  private _currentStep: INode;

  constructor(config: TConfig, settings?: TSettings) {
    const error = validateConfig(config);
    if (error) {
      _throw(error);
    }

    this._setSettings(settings);
    this._setSteps(config);
    this._setLifeCycleHooks(config);
  }

  public start(): void {
    this._beforeStart();

    const firstStep = this._steps.getFirst();
    if (!firstStep) {
      this._onError('No first step');
      return;
    }
    this._goTo(firstStep.value);

    this._started();
  }

  public goNext(): void {
    const nextStep = this._currentStep.next;
    if (!nextStep) {
      this.stop();
      return;
    }
    this._goTo(nextStep.value);
  }

  public goPrevious(): void {
    const previousStep = this._currentStep.next;
    if (!previousStep) {
      return;
    }
    this._goTo(previousStep);
  }

  public stop(): void {
    this._beforeFinish();

    this._currentStep.value.unmount();

    this._finished();
  }

  private _setSettings(settings: TSettings): void {
    this._onError = getCallback(settings.onError);
  }

  private _setSteps(config: TConfig): void {
    const list = new List();
    config.steps.forEach(stepConfig => {
      const step = new Step(stepConfig, { onError: this._onError });
      list.add(step);
    });
    this._steps = list;
  }

  private _setLifeCycleHooks(config: TConfig): void {
    this._beforeStart = getCallback(config.beforeStart);
    this._started = getCallback(config.started);
    this._beforeFinish = getCallback(config.beforeFinish);
    this._finished = getCallback(config.finished);
  }

  private _goTo(newStep: INode): void {
    this._currentStep.value.unmount();
    this._currentStep = newStep;
    this._currentStep.value.mount();
  }
};

export type TConfig = {
  steps: TStepConfig[],
  beforeStart?(): TCallback;
  started?(): TCallback;
  beforeFinish?(): TCallback;
  finished?(): TCallback;
};

type TSettings = {
  onError?(): TCallback;
};

type TCallback = void;
type TError = string;
