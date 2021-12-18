import {
    IConfig,
    INewbie,
    INewbieConfig,
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

    /**
     * Used to prevent running of goNext() and goPrevious() before start(),
     * as both methods may be called from the outside
     */
    private _isStarted: boolean = false;

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

    private _setSteps(config: INewbieConfig): void {
        const list = new LinkedList();

        config.steps.forEach((stepConfig, index) => {
            const id = stepConfig.id ? String(stepConfig.id) : index;

            const step = new Step(this._config.resolveStepConfig(id), {
                goNext: this.goNext.bind(this),
                goPrevious: this.goPrevious.bind(this),
                stop: this.stop.bind(this),
            });

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
}