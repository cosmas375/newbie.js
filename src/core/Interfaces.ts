// classes
export interface INewbie {
    start(): void;
    stop(): void;
    goNext(): void;
    goPrevious(): void;
}

export interface IStep {
    targetElement: HTMLElement;
    mount(): void;
    unmount(): void;
}

export interface IConfig {
    validate(): string | null;
    resolveStepConfig(stepId: string | number): IStepConfig;
}

export interface IHintFactory {
    create({ config, settings }): IHint;
}

export interface IHint {
    mount(targetElement: Element): void;
    unmount(): void;
    setContent(content: string | object): void;
}

export interface IShadow {
    mount(target: Element): void;
    unmount(): void;
}

// settings
export interface ICommonConfig {
    steps: IStepConfig[];
    shadow?: IShadowConfig;
    hint?: IHintConfig;
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
    content?: string;
    hint?: IHintConfig;
    beforeMount?(): TStepCallback;
    mounted?(targetElement: HTMLElement): TStepCallback;
    beforeUnmount?(targetElement: HTMLElement): TStepCallback;
    unmounted?(): TStepCallback;
}

export interface IShadowConfig {
    type?;
    offset?: number;
    borderRadius?: number;
    rootComponent?: HTMLElement;
}
export interface IHintConfig {
    component: HTMLElement;
    position?: Position;
}

export interface IHintSettings {
    goNext(): void;
    goPrevious(): void;
    stop(): void;
}

export type TNewbieCallback = void;

export type TStepCallback = void;

export interface IStepCalllbacks {
    onTargetNotFound?(): void;
}

export type TStepTarget = HTMLElement;

export enum Position {
    Top = 'top',
    TopLeft = 'top-left',
    TopRight = 'top-right',
    Right = 'right',
    RightTop = 'right-top',
    RightBottom = 'right-bottom',
    Bottom = 'bottom',
    BottomLeft = 'bottom-left',
    BottomRight = 'bottom-right',
    Left = 'left',
    LeftTop = 'left-top',
    LeftBottom = 'left-bottom',
}

export enum ClassNames {
    HINT_WRAP = 'newbie-hint-wrap',
    HINT_WRAP_INNER = 'newbie-hint-wrap__inner',
    HINT_WRAP_VISIBLE = 'newbie-hint-wrap_visible',
    HINT = 'newbie-hint',
    SHADOW = 'newbie-shadow',
    SHADOW_VISIBLE = 'newbie-shadow_visible',
    SHADOW_HTML = 'newbie-html-shadow',
    SHADOW_HTML_TOP = 'newbie-html-shadow_top',
    SHADOW_HTML_RIGHT = 'newbie-html-shadow_right',
    SHADOW_HTML_BOTTOM = 'newbie-html-shadow_bottom',
    SHADOW_HTML_LEFT = 'newbie-html-shadow_left',
    SHADOW_SVG = 'newbie-svg-shadow',
}

export enum Errors {
    NO_CONFIG_PROVIDED = 'No config provided!',
    ID_ERROR = 'Specify unique id for each step!',
    NO_STEPS_PROVIDED = 'No steps provided!',
    NO_STEP_TARGET_PROVIDED = 'No step target provided!',
    NO_HINT_PROVIDED = 'No hint provided!',
    NO_HINT_COMPONENT_PROVIDED = 'No hint component provided!',
}
