import { IConfig, Config, INewbieConfig, TCallback } from './Config';
import { IStep, Step } from './Step';
import { ILinkedList, INode, LinkedList } from '../helpers/LinkedList';
import getCallback from '../utils/getCallback';
import _throw from '../utils/throw';

export class Newbie {
  private _steps: ILinkedList<IStep>;
  private _config: IConfig;

  private _beforeStart(): TCallback { };
  private _started(): TCallback { };
  private _beforeFinish(): TCallback { };
  private _finished(): TCallback { };

  private _currentStep: INode;
  private _isStarted: boolean;

  constructor(config: INewbieConfig) {
    this._config = new Config(config);
    const error = this._config.validate();
    if (error) {
      _throw(error);
    }

    this._setSteps(config);
    this._setLifeCycleHooks(config);
  }

  public start(): void {
    this._beforeStart();

    const firstStep = this._steps.getFirst();
    if (!firstStep) {
      _throw('No first step');
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

  private _setSteps(config: INewbieConfig): void {
    const list = new LinkedList();
    config.steps.forEach(stepConfig => {
      const step = new Step(this._config.resolveStepConfig(stepConfig.id));
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
    if (this._currentStep) {
      this._currentStep.value.unmount();
    }
    this._currentStep = newStep;
    this._currentStep.value.mount();
  }
};
