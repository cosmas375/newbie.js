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
    elem: HTMLElement;
    mount(): void;
    unmount(): void;
    setContent(content: object): void;
}

export interface IShadow {
    mount(targetElement: HTMLElement, config: IShadowConfig): void;
    unmount(): void;
}

export interface IArrow {
    elem: TElement;
    mount(config: IArrowConfig, settings: object): void;
    unmount(): void;
}

// config
export interface ICommonConfig {
    steps: IStepConfig[];
    shadow?: IShadowConfig;
    hint?: IHintConfig;
    arrow?: IArrowConfig;
    position?: Position;
    offsetX?: number;
    offsetY?: number;
    transitionDuration?: number;
}

export interface INewbieConfig extends ICommonConfig {
    beforeStart?(): TNewbieCallback;
    started?(): TNewbieCallback;
    beforeFinish?(): TNewbieCallback;
    finished?(): TNewbieCallback;
}

export interface IStepConfig extends ICommonConfig {
    id: string;
    target: TStepTarget;
    content?: object;
    beforeMount?(): TStepCallback;
    mounted?(targetElement: HTMLElement): TStepCallback;
    beforeUnmount?(targetElement: HTMLElement): TStepCallback;
    unmounted?(): TStepCallback;
}

export interface IShadowConfig {
    enabled?: boolean;
    color?: string;
    offset?: number;
    borderRadius?: number;
    rootComponent?: HTMLElement;
    disableScroll?: boolean;
}

export interface IHintConfig {
    component: HTMLElement;
}

export interface IArrowConfig {
    enabled: boolean;
    size?: number;
    color?: string;
    offsetX?: number;
    offsetY?: number;
}
// end config

export interface IHintSettings {
    goNext(): void;
    goPrevious(): void;
    stop(): void;
}

export type TElement = HTMLElement | null;

export type TNewbieCallback = void;

export type TStepCallback = void;

export interface IStepCalllbacks {
    onTargetNotFound?(): void;
}

export type TStepTarget = HTMLElement;
