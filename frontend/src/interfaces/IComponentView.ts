export interface IComponentView {
  renderTemplate(container: HTMLElement, ...args: any): void;
  removeTemplate(): void;
}
