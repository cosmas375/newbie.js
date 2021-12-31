// classes
export interface INewbie {
    start(): void;
    stop(): void;
    goNext(): void;
    goPrevious(): void;
}

export interface IStep {
    readonly isMounted: boolean;
    mount(): void;
    unmount(): void;
}

export interface IConfig {
    config: INewbieConfig;
    validate(): string | null;
    resolveStepConfig(stepId: string | number): IStepConfig;
}

export interface IComponentsFactory {
    createStepContainer(payload);
    createShadow(payload);
    createHint(payload);
    createArrow(payload);
}

export interface IHintFactory {
    create({ config, settings }): IHint;
}

export interface IHint {
    elem: HTMLElement;
    mount(): void;
    unmount(): void;
}

export interface IShadow {
    mount(settings: object): void;
    unmount(): void;
}

export interface IArrow {
    elem: HTMLElement;
    mount(config: IArrowConfig, { position, hintRect }): void;
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
    type?;
    color?: string;
    offset?: number;
    borderRadius?: number;
    rootComponent?: HTMLElement;
}

export interface IHintConfig {
    component: HTMLElement;
}

export interface IArrowConfig {
    // position: Position;
    type: ArrowType;
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
    ARROW = 'newbie-arrow',
    ARROW_VISIBLE = 'newbie-arrow_visible',
}

export enum Errors {
    NO_CONFIG_PROVIDED = 'No config provided!',
    ID_ERROR = 'Specify unique id for each step!',
    NO_STEPS_PROVIDED = 'No steps provided!',
    NO_STEP_TARGET_PROVIDED = 'No step target provided!',
    NO_HINT_PROVIDED = 'No hint provided!',
    NO_HINT_COMPONENT_PROVIDED = 'No hint component provided!',
}

export enum ArrowType {
    NULL = 'null',
    TRIAGLE = 'triangle',
}
