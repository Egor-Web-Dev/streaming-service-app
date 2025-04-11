import { ICustomPlaylist } from "../../interfaces/ICustomPlaylist";

export class PlaylistsModel {
  private playlists: ICustomPlaylist[] = [];

  constructor() {}

  clearPlaylists(): void {
    this.playlists = [];
  }

  setPlaylist(playlist: ICustomPlaylist) {
    this.playlists.push(playlist);
  }

  getData(): ICustomPlaylist[] {
    return [...this.playlists];
  }
}
