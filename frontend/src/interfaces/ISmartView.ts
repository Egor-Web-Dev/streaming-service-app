import { IComponentView } from "./IComponentView";

export interface ISmartView extends IComponentView {
  update(...args: any[]): void;
}
