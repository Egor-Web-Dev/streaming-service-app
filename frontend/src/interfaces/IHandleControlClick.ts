export interface IHandleControlClick {
  start(): Promise<void>;
  next(isNext?: boolean): Promise<void>;
  loop(): void;
  shuffle(): void;
  rewind(progress: number): void;
}
