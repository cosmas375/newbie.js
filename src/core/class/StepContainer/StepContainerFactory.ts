import { StepContainer } from './StepContainer';

export class StepContainerFactory {
    private static _stepContainer: StepContainer | null = null;

    public static create(settings: object) {
        if (!this._stepContainer) {
            this._stepContainer = new StepContainer(settings);
        }
        return this._stepContainer;
    }
}
