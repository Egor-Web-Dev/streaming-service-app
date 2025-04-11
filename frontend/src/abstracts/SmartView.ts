import { AbstractView } from "./AbstractView";
import { ISmartView } from "../interfaces/ISmartView";

export abstract class SmartView extends AbstractView implements ISmartView {
  abstract update(...args: any[]): void;
}
