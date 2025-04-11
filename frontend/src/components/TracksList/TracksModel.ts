import { ITrack } from "../../interfaces/ITrack";

export class TracksModel {
  private tracks: ITrack[] = [];

  constructor() {}

  setTracks(tracks: ITrack | ITrack[]) {
    if (tracks instanceof Array) {
      this.tracks = tracks;
    } else {
      this.tracks.push(tracks);
    }
  }

  clearTracks(): void {
    this.tracks = [];
  }

  getTracks(): ITrack[] {
    return [...this.tracks];
  }

  removeTrack(id: number): ITrack[] {
    this.tracks = this.tracks.filter((t) => t.id !== id);
    return [...this.tracks];
  }
}
