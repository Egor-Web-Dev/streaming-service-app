import { AbstractView } from "./AbstractView";

export abstract class AbstractPopupButton extends AbstractView {
  constructor() {
    super();
  }

  renderTemplate(container: HTMLElement, trackId: number): void {
    const template = this.createTemplate(trackId);

    this.container = container;
    this.container.append(template);
  }
}
