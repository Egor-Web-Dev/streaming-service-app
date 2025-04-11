import { TracksModel } from "./TracksModel";
import { PopupSingleton } from "../TracksPopup";
import { TracksListView } from "./TracksListView";
import { ApiPresenter } from "../../api/ApiPresenter";
import { DeleteModalSingleton } from "../DeleteModal";
import { TracksListPresenter } from "./TracksListPresenter";

export class PlaylistTracksPresenter extends TracksListPresenter {
  constructor(
    tracksView: TracksListView,
    tracksModel: TracksModel,
    playlistId: number,
  ) {
    super(tracksView, tracksModel);
    const removeTrack = this.removeTrack.bind(this, playlistId);

    PopupSingleton.init("delete");
    DeleteModalSingleton.init(removeTrack);
  }

  async removeTrack(playlistId: number, trackId: number): Promise<void> {
    const { removeSongFromPlaylist } = ApiPresenter.getInstance();

    await removeSongFromPlaylist(trackId, playlistId);

    this.tracksModel.removeTrack(trackId);
    this.updateList();
  }
}
