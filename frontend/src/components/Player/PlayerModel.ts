import { ITrack } from "../../interfaces/ITrack";

export class PlayerModel {
  private tracksPageTitle: string = "";
  private audioList: number[] = [];
  private currentIndex = -1;
  private currentTrack: ITrack | null = null;
  private isShuffled = false;

  constructor() {}

  set tracksPageName(name: string) {
    this.tracksPageTitle = name;
  }

  get tracksPageName(): string {
    return this.tracksPageTitle;
  }

  getCurrentTrack(): ITrack | void {
    const curTrack = this.currentTrack;

    if (curTrack) return curTrack;
  }

  getTrackId(index: number): number {
    const audioList = this.audioList;

    if (audioList.length <= index || index < 0) {
      return 0;
    }

    return audioList[index];
  }

  getNextTrackId(): number {
    return this.getTrackId(this.currentIndex + 1);
  }

  getPrevTrackId(): number {
    return this.getTrackId(this.currentIndex - 1);
  }

  shuffleTracks(): void {
    this.isShuffled = !this.isShuffled;

    if (this.isShuffled) {
      this.shuffleAudioList();
    } else {
      this.unshuffleAudioList();
    }
  }

  setTracksList(tracks: number[]): void {
    this.audioList = tracks;

    if (this.isShuffled) {
      this.shuffleAudioList();
    }
  }

  setTrack(track: ITrack): void {
    this.currentTrack = track;
    this.setIndex(track);
  }

  private setIndex(track: ITrack): void {
    if (this.audioList) {
      const index = this.audioList.indexOf(track.id);
      this.currentIndex = index;
    }
  }

  private shuffleAudioList(): void {
    const audioList = this.audioList;

    for (let i = audioList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [audioList[i], audioList[j]] = [audioList[j], audioList[i]];
    }
  }

  private unshuffleAudioList(): void {
    this.audioList.sort((a, b) => (a > b ? 1 : -1));
  }
}
