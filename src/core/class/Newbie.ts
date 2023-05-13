import { ILinkedList, INode, LinkedList } from '../helpers/LinkedList';
import { INewbie, IStep, TCallback, TNewbieConfig } from '../Interfaces';
import getCallback from '../utils/getCallback';
import _throw from '../utils/throw';
import _warn from '../utils/warn';
import { Config } from './Config';
import { Step } from './Step';

export class Newbie implements INewbie {
    private _steps: ILinkedList<IStep>;
    private _config: Config;
    private _lifecycleHooks;

    private _currentStep: INode<IStep> | null = null;

    constructor(config: TNewbieConfig) {
        this._config = new Config(config);

        const error = this._config.validate();
        if (error) {
            _throw(error);
        }

        this._steps = this._getSteps();
        this._lifecycleHooks = this._getLifeCycleHooks();
    }

    public async start(): Promise<void> {
        await this._lifecycleHooks.beforeStart();

        const firstStep = this._steps.getFirst();
        if (firstStep) {
            await this._goTo(firstStep);

            await this._lifecycleHooks.started();
        }
    }

    public async goNext(): Promise<void> {
        if (!this._currentStep) {
            return;
        }

        const nextStep = this._currentStep.next;

        if (!nextStep) {
            await this.stop();
            return;
        }

        await this._goTo(nextStep);
    }

    public async goPrevious(): Promise<void> {
        if (!this._currentStep) {
            return;
        }

        const previousStep = this._currentStep.previous;

        if (!previousStep) {
            return;
        }

        await this._goTo(previousStep);
    }

    public async goTo(id: string): Promise<void> {
        if (!this._currentStep) {
            return;
        }

        let step = this._steps.getFirst();
        while (step && step.value.getId() !== id) {
            step = step.next;
        }

        if (!step) {
            _warn(`Step ${id} not found!`);
            return;
        }

        await this._goTo(step);
    }

    public async stop(): Promise<void> {
        await this._lifecycleHooks.beforeFinish();

        if (this._currentStep) {
            this._currentStep.value.unmount();
            this._currentStep = null;
        }

        this._reset();

        await this._lifecycleHooks.finished();
    }

    private async _goTo(step: INode<IStep>): Promise<void> {
        if (this._currentStep) {
            this._currentStep.value.unmount();
        }

        this._currentStep = step;
        await this._currentStep.value.mount();
    }

    private _getSteps(): ILinkedList<IStep> {
        const config = this._config.getConfig();

        const list = new LinkedList<IStep>();

        config.steps.forEach(stepConfig => {
            const step = new Step(
                this._config.getStepConfig(stepConfig.id),
                this._getStepSettings()
            );

            list.add(step);
        });

        return list;
    }

    private _getLifeCycleHooks() {
        const config = this._config.getConfig();
        return {
            beforeStart: getCallback(config.beforeStart),
            started: getCallback(config.started),
            beforeFinish: getCallback(config.beforeFinish),
            finished: getCallback(config.finished),
        };
    }

    private _reset() {
        let step = this._steps.getFirst();

        while (step) {
            step.value.reset();
            step = step.next;
        }
    }

    private _getStepSettings() {
        return {
            goNext: this.goNext.bind(this),
            goPrevious: this.goPrevious.bind(this),
            stop: this.stop.bind(this),
            goTo: this.goTo.bind(this),
        };
    }
}