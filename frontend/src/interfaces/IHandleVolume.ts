export interface IHandleVolume {
  volume: number;
  muteSound: () => number;
  changeVolume: (volume: number) => void;
}
