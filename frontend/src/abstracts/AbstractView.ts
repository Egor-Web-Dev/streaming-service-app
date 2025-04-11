import { IComponentView } from "../interfaces/IComponentView";

export abstract class AbstractView implements IComponentView {
  protected container: HTMLElement | null = null;
  protected template: HTMLElement | null = null;

  abstract renderTemplate(container: HTMLElement, ...args: any): void;

  protected abstract createTemplate(...args: any): HTMLElement;

  removeTemplate(): void {
    this.template?.remove();
    this.template = null;
  }
}
