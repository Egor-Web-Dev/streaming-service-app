import { PlaylistsView } from "./PlaylistsView";
import { PlaylistsModel } from "./PlaylistsModel";
import { AbstractPresenter } from "../../abstracts";
import { ApiPresenter } from "../../api/ApiPresenter";
import { IPlaylist } from "../../interfaces/IPlaylist";
import { formatPlaylist } from "../../utils/formatPlaylist";
import { FilterMediator } from "../FIlterMediator/FilterMediator";

export class PlaylistsPresenter extends AbstractPresenter {
  private playlistsModel: PlaylistsModel;
  private playlistsView: PlaylistsView;

  constructor() {
    super();

    this.playlistsModel = new PlaylistsModel();
    this.playlistsView = new PlaylistsView();
  }

  render(container: HTMLElement): void {
    this.getPlaylists().then((playlistsList) => {
      this.setPlaylistToModel(playlistsList);

      const playlists = this.playlistsModel.getData();

      this.playlistsView.renderTemplate(container, playlists);
      FilterMediator.setHandleFilterInput(this.updateList.bind(this));
    });
  }

  private updateList(): void {
    const playlists = this.playlistsModel.getData();
    const filteredPlaylists = FilterMediator.filterList(playlists, ["name"]);

    this.playlistsView.update(filteredPlaylists);
  }

  private async getPlaylists(): Promise<IPlaylist[]> {
    const { getPlaylists } = ApiPresenter.getInstance();
    return (await getPlaylists()) || [];
  }

  private setPlaylistToModel(playlists: IPlaylist[]): void {
    this.playlistsModel.clearPlaylists();

    playlists.forEach((p) => {
      this.playlistsModel.setPlaylist(formatPlaylist(p));
    });
  }
}
