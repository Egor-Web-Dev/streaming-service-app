import { TracksPageView } from "../TracksPage";
import { ISong } from "../../interfaces/ISong";
import { ITrack } from "../../interfaces/ITrack";
import { AbstractPresenter } from "../../abstracts";
import { ApiPresenter } from "../../api/ApiPresenter";
import { PlaylistsPageView } from "../PlaylistsPage";
import { formatSong } from "../../utils/formatSong";
import {
  TracksListPresenter,
  TracksModel,
  TracksListView,
  PlaylistTracksPresenter,
} from "../TracksList";

export class ScreenPresenter extends AbstractPresenter {
  private container: HTMLElement | null = null;

  constructor() {
    super();
  }

  render(container: HTMLElement): void {
    this.container = container;
    this.renderCurrentPage();
  }

  async renderCurrentPage(): Promise<void> {
    const pathname = new URL(location.href).pathname;
    const playlistId = Number(pathname.match(/[0-9]/)?.[0]) || null;
    const path = pathname.split("/")[1];

    await this.renderPage(path, playlistId);
  }

  private async renderPage(
    state: string,
    id: number | null = null,
  ): Promise<void> {
    switch (state) {
      case "playlists":
        this.renderPlaylistsPage();
        break;
      case "playlist":
        await this.renderPlaylistPage(id!);
        break;
      case "favorite":
        await this.renderFavoritePage();
        break;
      default:
        await this.renderTracksPage();
        break;
    }
  }

  private renderPlaylistsPage(): void {
    const playlistsPage = new PlaylistsPageView();
    playlistsPage.renderTemplate(this.container!);
  }

  private async renderTracksPage(): Promise<void> {
    const { getSongs } = ApiPresenter.getInstance();
    const songs = await getSongs();
    const tracksPage = this.createTracksPage("Треки", songs);

    tracksPage.renderTemplate(this.container!);
  }

  private async renderFavoritePage(): Promise<void> {
    const { getFavoriteSongs } = ApiPresenter.getInstance();
    const songs = await getFavoriteSongs();
    const tracksPage = this.createTracksPage("Любимые песни", songs);

    tracksPage.renderTemplate(this.container!);
  }

  private async renderPlaylistPage(playlistId: number): Promise<void> {
    const { getPlaylist } = ApiPresenter.getInstance();
    const playlist = await getPlaylist(playlistId);

    if (playlist) {
      this.createTracksPage(
        playlist.name,
        playlist.songs,
        playlistId,
      ).renderTemplate(this.container!);
    }
  }

  private createTracksPage(
    pageTitle: string,
    songs: ISong[],
    playlistId?: number,
  ): TracksPageView {
    const tracks = this.formatSongs(songs);
    const tracksModel = new TracksModel();

    tracks.sort((a, b) => (a.id > b.id ? 1 : -1));

    tracksModel.setTracks(tracks);

    const tracksView = new TracksListView(tracks);
    const tracksPresenter = playlistId
      ? new PlaylistTracksPresenter(tracksView, tracksModel, playlistId)
      : new TracksListPresenter(tracksView, tracksModel);

    return new TracksPageView(pageTitle, tracksPresenter);
  }

  private formatSongs(songs: ISong[]): ITrack[] {
    return songs.map((s) => formatSong(s));
  }
}
