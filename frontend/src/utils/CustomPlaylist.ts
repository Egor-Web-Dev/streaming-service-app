import { ICustomPlaylist } from "../interfaces/ICustomPlaylist";

export class CustomPlaylist implements ICustomPlaylist {
  readonly id: number;
  readonly name: string;
  readonly amountSongs: number;
  readonly path: string;
  readonly images: string[];

  constructor(
    playlistId: number,
    playlistName: string,
    amountSong: number,
    path: string,
    images: string[],
  ) {
    this.id = playlistId;
    this.name = playlistName;
    this.amountSongs = amountSong;
    this.path = path;
    this.images = images;
  }
}
