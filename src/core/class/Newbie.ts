import { IConfig, INewbie, INewbieConfig, IStep } from '../Interfaces';
import { Config } from './Config';
import { Step } from './Step';
import { ILinkedList, INode, LinkedList } from '../helpers/LinkedList';
import getCallback from '../utils/getCallback';
import _throw from '../utils/throw';
import _warn from '../utils/warn';

export class Newbie implements INewbie {
    private _steps: ILinkedList<IStep>;
    private _config: IConfig;
    private _lifecycleHooks;

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

    public async start(): Promise<void> {
        await this._lifecycleHooks.beforeStart();

        await this._goTo(this._steps.getFirst());

        await this._lifecycleHooks.started();
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

        const step = this._steps.getById(id);

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

    private async _goTo(step: INode): Promise<void> {
        if (this._currentStep) {
            this._currentStep.value.unmount();
        }

        this._currentStep = step;
        await this._currentStep.value.mount();
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
                goTo: this.goTo.bind(this),
            });

            list.add(step);
        });

        this._steps = list;
    }

    private _setLifeCycleHooks(): void {
        const config = this._config.config;
        this._lifecycleHooks = {
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
}
