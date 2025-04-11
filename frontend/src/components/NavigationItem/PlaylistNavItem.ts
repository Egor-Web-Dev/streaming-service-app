import { IPlaylistNavItem } from "../../interfaces/IPlaylistNavItem";

export class PlaylistNavItem implements IPlaylistNavItem {
  readonly playlistId: number;
  readonly title: string;
  readonly path: string;

  constructor(playlistName: string, playlistId: number, path: string) {
    this.playlistId = playlistId;
    this.title = playlistName;
    this.path = path;
  }
}
