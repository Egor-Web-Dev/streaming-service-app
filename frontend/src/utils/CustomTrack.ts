import { ISong } from "../interfaces/ISong";
import { ITrack } from "../interfaces/ITrack";

export class CustomTrack implements ITrack {
  readonly id: number;
  readonly name: string;
  readonly singer: string;
  readonly album: string;
  readonly duration: number;
  readonly createdAt: string;
  readonly image: string;
  readonly path: string;
  readonly isLike: boolean;

  constructor(song: ISong, isLike: boolean) {
    const duration = parseFloat((song.duration / 1000).toFixed(3));

    this.id = song.id;
    this.name = song.name;
    this.singer = song.artist.name;
    this.album = song.album.name;
    this.duration = duration;
    this.image = song.image;
    this.createdAt = song.createdAt;
    this.path = song.path;
    this.isLike = isLike;
  }
}
