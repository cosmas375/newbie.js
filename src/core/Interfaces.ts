import { StepContainer } from './class/StepContainer/StepContainer';
import { Position } from './Position';

// classes
export interface INewbie {
    start(): void;
    stop(): void;
    goNext(): void;
    goPrevious(): void;
    goTo(id: TStepId): void;
}

export interface IStep {
    getId(): TStepId;
    mount(): void;
    unmount(): void;
    reset(): void;
}

export interface IConfig {
    getConfig(): TValidNewbieConfig;
    validate(): string | null;
    getStepConfig(stepId: TStepId): TValidStepConfig;
}

export interface IComponentsFactory {
    createStepContainer(payload: object): StepContainer;
    createShadow(config: TShadowConfig, settings: object): IShadow;
    createHint(config: THintConfig, settings: THintSettings): IHint;
    createArrow(config: TArrowConfig): IArrow;
}

export interface IHintFactory {
    create(config: THintConfig, payload: object): IHint;
}

export interface IHint {
    mount(): Promise<TElement>;
    unmount(): void;
    setContent(content: TStepContent): void;
}

export interface IShadow {
    mount(targetElement: HTMLElement, config: TValidShadowConfig): void;
    unmount(): void;
    reset(): void;
}

export interface IArrow {
    mount(config: TArrowConfig): TElement;
    unmount(): void;
}

// config
export type TCommonUserConfig = {
    shadow?: TShadowConfig;
    hint?: THintConfig;
    arrow?: TArrowConfig;
    position?: Position;
    offsetX?: TOffset;
    offsetY?: TOffset;
    transitionDuration?: number;
};

export type TNewbieConfig = TCommonUserConfig & {
    steps: TValidStepConfig[];
    beforeStart?: TCallback;
    started?: TCallback;
    beforeFinish?: TCallback;
    finished?: TCallback;
};

export type TStepConfig = TCommonUserConfig & {
    id: TStepId;
    target: TElement | string;
    content?: TStepContent;
    beforeMount?: TCallback;
    mounted?: TCallback;
    beforeUnmount?: TCallback;
    unmounted?: TCallback;
};

export type TShadowConfig = {
    enabled?: boolean;
    color?: string;
    offset?: number;
    borderRadius?: number;
    rootComponent?: HTMLElement; // TODO: move it to the root
    disableScroll?: boolean;
};

export type THintConfig = {
    component: HTMLElement;
};

export type TArrowConfig = {
    enabled?: boolean;
    size?: number;
    color?: string;
    padding?: TOffset;
};

export type TValidNewbieConfig = TNewbieConfig & {
    steps: TValidStepConfig[];
};

export type TValidStepConfig = TStepConfig & {
    hint: THintConfig;
    content: TStepContent;
    position: Position;
    offsetX: TOffset;
    offsetY: TOffset;
    shadow: TValidShadowConfig;
    arrow: TValidArrowConfig;
};

export type TValidShadowConfig = TShadowConfig & {
    color: TColor;
    offset: number;
    rootComponent: TElement;
};

export type TValidArrowConfig = TArrowConfig & {
    enabled: boolean;
    padding: TOffset;
};
// end config

export type TId = string;

export type TStepId = TId;

export type TColor = string;

export type THintSettings = {
    goNext(): Promise<void>;
    goPrevious(): Promise<void>;
    stop(): Promise<void>;
    goTo(id: TStepId): Promise<void>;
};

export type TElement = HTMLElement;
export type TTargetElement = TElement | null;

export type TCallback = <T>(targetElement?: TTargetElement) => void;

export type TOffset = number;

export type TStepContent = Record<
    string,
    | string
    | {
          useHtml?: boolean;
          text: string;
      }
>;