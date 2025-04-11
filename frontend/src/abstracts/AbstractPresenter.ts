import { IComponentPresenter } from "../interfaces/IComponentPresenter";

export abstract class AbstractPresenter implements IComponentPresenter {
  abstract render(container: HTMLElement, ...args: any): void;
}
