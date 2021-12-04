import { AbstractHint } from './AbstractHint';

export class SimpleHint extends AbstractHint {
  private _component: HTMLElement;

  constructor(settings) {
    super(settings);

    this._component = settings.component;
  }

  mount(targetElement) {
    super.mount(targetElement);
    super._mountHint(this._component);
    super._show();
  }

  setContent(content: string = '') {
    const contentElement = this._component.querySelector('[data-newbie-step-content]');
    if (!contentElement) {
      return;
    }
    contentElement.innerHTML = content;
  }
}
