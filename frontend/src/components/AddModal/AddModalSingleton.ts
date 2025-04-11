import { AddModalView } from "./AddModalView";
import { ApiPresenter } from "../../api/ApiPresenter";
import { IPlaylist } from "../../interfaces/IPlaylist";
import { formatPlaylist } from "../../utils/formatPlaylist";
import { ICustomPlaylist } from "../../interfaces/ICustomPlaylist";

export class AddModalSingleton {
  private static currentTrackId: number;

  private constructor() {}

  static openModal(trackId: number): void {
    const container = document.getElementById("root")!;
    const modal = new AddModalView(this.addSongToPlaylist.bind(this));

    this.currentTrackId = trackId;
    container.style.overflow = "hidden";

    this.getPlaylists().then((playlists) => {
      const modalItems = playlists.map((p) => formatPlaylist(p));
      modal.renderTemplate(container, modalItems);
    });
  }

  private static async getPlaylists(): Promise<IPlaylist[]> {
    const { getPlaylists } = ApiPresenter.getInstance();
    return (await getPlaylists()) || [];
  }

  private static async addSongToPlaylist(
    playlistId: number,
  ): Promise<ICustomPlaylist | void> {
    const trackId = this.currentTrackId;
    const { addSongToPlaylist } = ApiPresenter.getInstance();
    const playlist = await addSongToPlaylist(trackId, playlistId);

    if (playlist) return formatPlaylist(playlist);
  }
}
