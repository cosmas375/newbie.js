import { INewbieConfig, TCallback } from '../helpers/Config';
import { IStep, Step } from './Step';
import { IList, INode, List } from '../helpers/List';
import validateConfig from '../utils/validateConfig';
import getCallback from '../utils/getCallback';
import resolveStepConfig from '../utils/resolveStepConfig';
import _throw from '../utils/throw';

export class Newbie {
  private _steps: IList<IStep>;

  private _beforeStart(): TCallback { };
  private _started(): TCallback { };
  private _beforeFinish(): TCallback { };
  private _finished(): TCallback { };

  private _onError(err?: TError): TCallback { };

  private _currentStep: INode;
  private _isStarted: boolean;

  constructor(config: INewbieConfig, settings?: TSettings) {
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
    this._goTo(firstStep);
    this._isStarted = true;

    this._started();
  }

  public goNext(): void {
    if (!this._isStarted) {
      return;
    }
    const nextStep = this._currentStep.next;
    if (!nextStep) {
      this.stop();
      return;
    }
    this._goTo(nextStep);
  }

  public goPrevious(): void {
    if (!this._isStarted) {
      return;
    }
    const previousStep = this._currentStep.previous;
    if (!previousStep) {
      return;
    }
    this._goTo(previousStep);
  }

  public stop(): void {
    this._beforeFinish();

    this._currentStep.value.unmount();
    this._isStarted = false;

    this._finished();
  }

  private _setSettings(settings: TSettings = {}): void {
    this._onError = getCallback(settings.onError);
  }

  private _setSteps(config: INewbieConfig): void {
    const list = new List();
    config.steps.forEach(stepConfig => {
      const step = new Step(resolveStepConfig(stepConfig, config), { onError: this._onError });
      list.add(step);
    });
    this._steps = list;
  }

  private _setLifeCycleHooks(config: INewbieConfig): void {
    this._beforeStart = getCallback(config.beforeStart);
    this._started = getCallback(config.started);
    this._beforeFinish = getCallback(config.beforeFinish);
    this._finished = getCallback(config.finished);
  }

  private _goTo(newStep: INode): void {
    if (this._currentStep) [
      this._currentStep.value.unmount();
    ]
    this._currentStep = newStep;
    this._currentStep.value.mount();
  }
};

type TSettings = {
  onError?(): TCallback;
};

type TError = string;
