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
import _warn from '../utils/warn';

export class Newbie implements INewbie {
    private _steps: ILinkedList<IStep>;
    private _config: IConfig;

    private _beforeStart(): TNewbieCallback {}
    private _started(): TNewbieCallback {}
    private _beforeFinish(): TNewbieCallback {}
    private _finished(): TNewbieCallback {}

    private _currentStep: INode | null = null;

    constructor(config: INewbieConfig) {
        this._config = new Config(config);

        const error = this._config.validate();
        if (error) {
            _throw(error);
        }

        this._setSteps();
        this._setLifeCycleHooks();
    }

    public start(): void {
        this._beforeStart();

        this._goTo(this._steps.getFirst());

        this._started();
    }

    public goNext(): void {
        if (!this._currentStep) {
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
        if (!this._currentStep) {
            return;
        }

        const previousStep = this._currentStep.previous;

        if (!previousStep) {
            return;
        }

        this._goTo(previousStep);
    }

    public goTo(id: string): void {
        if (!this._currentStep) {
            return;
        }

        const step = this._steps.getById(id);

        if (!step) {
            _warn(`Step ${id} not found!`);
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

        this._finished();
    }

    private _goTo(step: INode): void {
        if (this._currentStep) {
            this._currentStep.value.unmount();
        }

        this._currentStep = step;
        this._currentStep.value.mount();
    }

    private _setSteps(): void {
        const config = this._config.config;

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

    private _setLifeCycleHooks(): void {
        const config = this._config.config;
        this._beforeStart = getCallback(config.beforeStart);
        this._started = getCallback(config.started);
        this._beforeFinish = getCallback(config.beforeFinish);
        this._finished = getCallback(config.finished);
    }
}
