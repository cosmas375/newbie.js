import { StepContainer } from './class/StepContainer/StepContainer';
import { Position } from './Position';

// classes
export interface INewbie {
    start(): void;
    stop(): void;
    goNext(): void;
    goPrevious(): void;
    goTo(id: string): void;
}

export interface IStep {
    id: string;
    mount(): void;
    unmount(): void;
    reset(): void;
}

export interface IStepView {
    mount(): void;
    unmount(): void;
    reset(): void;
}

export interface IConfig {
    config: INewbieConfig;
    validate(): string | null;
    resolveStepConfig(stepId: string | number): IStepConfig;
}

export interface IComponentsFactory {
    createStepContainer(payload: object): StepContainer;
    createShadow(config: IShadowConfig, settings: object): IShadow;
    createHint(config: IHintConfig, settings: IHintSettings): IHint;
    createArrow(config: IArrowConfig): IArrow;
}

export interface IHintFactory {
    create(config: IHintConfig, payload: object): IHint;
}

export interface IHint {
    mount(): Promise<HTMLElement | null>;
    unmount(): void;
    setContent(content: object): void;
}

export interface IShadow {
    mount(targetElement: HTMLElement, config: IShadowConfig): void;
    unmount(): void;
    reset(): void;
}

export interface IArrow {
    mount(config: IArrowConfig): HTMLElement | null;
    unmount(): void;
}

// config
export interface ICommonConfig {
    shadow?: IShadowConfig;
    hint?: IHintConfig;
    arrow?: IArrowConfig;
    position?: Position;
    offsetX?: number;
    offsetY?: number;
    transitionDuration?: number;
}

export interface INewbieConfig extends ICommonConfig {
    steps: IStepConfig[];
    beforeStart?(): TCallback;
    started?(): TCallback;
    beforeFinish?(): TCallback;
    finished?(): TCallback;
}

export interface IStepConfig extends ICommonConfig {
    id: string;
    target: TElement;
    content?: object;
    beforeMount?(): TCallback;
    mounted?(targetElement: HTMLElement): TCallback;
    beforeUnmount?(targetElement: HTMLElement): TCallback;
    unmounted?(): TCallback;
}

export interface IShadowConfig {
    enabled?: boolean;
    color?: string;
    offset?: number;
    borderRadius?: number;
    rootComponent?: HTMLElement; // TODO: move it to the root
    disableScroll?: boolean;
}

export interface IHintConfig {
    component: HTMLElement;
}

export interface IArrowConfig {
    enabled: boolean;
    size?: number;
    color?: string;
    padding?: number;
}
// end config

export interface IHintSettings {
    goNext(): Promise<void>;
    goPrevious(): Promise<void>;
    stop(): Promise<void>;
    goTo(id: string): Promise<void>;
}

export type TElement = HTMLElement | null;

export type TCallback = Promise<void>;

export interface IStepCalllbacks {
    onTargetNotFound?(): void;
}
