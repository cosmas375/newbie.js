import { StepContainer } from './StepContainer';

export class StepContainerFactory {
    private static _stepContainer: StepContainer;

    public static create(payload) {
        if (!this._stepContainer) {
            this._stepContainer = new StepContainer(payload);
        }
        return this._stepContainer;
    }
}
