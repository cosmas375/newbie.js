import {
    IConfig,
    INewbie,
    INewbieSettings,
    IStep,
    TNewbieCallback,
} from '../Interfaces';
import { Config } from './Config';
import { Step } from './Step';
import { ILinkedList, INode, LinkedList } from '../helpers/LinkedList';
import getCallback from '../utils/getCallback';
import _throw from '../utils/throw';

export class Newbie implements INewbie {
    private _steps: ILinkedList<IStep>;
    private _config: IConfig;

    private _beforeStart(): TNewbieCallback {}
    private _started(): TNewbieCallback {}
    private _beforeFinish(): TNewbieCallback {}
    private _finished(): TNewbieCallback {}

    private _currentStep: INode = null;
    private _isStarted: boolean = false;

    constructor(config: INewbieSettings) {
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

        let step = this._steps.getFirst();
        while (step && !step.value.targetElement) {
            step = step.next;
        }

        if (!step) {
            this.stop();
            return;
        }

        this._goTo(step);

        this._isStarted = true;

        this._started();
    }

    public goNext(): void {
        if (!this._isStarted) {
            return;
        }

        let step = this._currentStep.next;
        while (step && !step.value.targetElement) {
            step = step.next;
        }

        if (!step) {
            this.stop();
            return;
        }

        this._goTo(step);
    }

    public goPrevious(): void {
        if (!this._isStarted) {
            return;
        }

        let step = this._currentStep.previous;
        while (step && !step.value.targetElement) {
            step = step.previous;
        }

        if (!step) {
            return;
        }

        this._goTo(step);
    }

    public stop(): void {
        this._beforeFinish();

        if (this._currentStep) {
            this._currentStep.value.unmount();
            this._currentStep = null;
        }

        this._isStarted = false;

        this._finished();
    }

    private _setSteps(config: INewbieSettings): void {
        const list = new LinkedList();

        config.steps.forEach((stepConfig, index) => {
            const step = new Step(
                this._config.resolveStepConfig(
                    stepConfig.id ? String(stepConfig.id) : index
                )
            );

            list.add(step);
        });

        this._steps = list;
    }

    private _setLifeCycleHooks(config: INewbieSettings): void {
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
}
