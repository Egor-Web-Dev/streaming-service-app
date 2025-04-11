import { TracksModel } from "./TracksModel";
import { PopupSingleton } from "../TracksPopup";
import { AbstractPresenter } from "../../abstracts";
import { FilterMediator } from "../FIlterMediator";
import { TracksListView } from "./TracksListView";

export class TracksListPresenter extends AbstractPresenter {
  protected readonly tracksModel: TracksModel;
  protected readonly tracksListView: TracksListView;

  constructor(tracksListView: TracksListView, tracksListModel: TracksModel) {
    super();

    this.tracksModel = tracksListModel;
    this.tracksListView = tracksListView;

    PopupSingleton.init("add");

    window.addEventListener("playtrack", this.markCurrentTrack.bind(this));
  }

  render(container: HTMLElement) {
    this.tracksListView.renderTemplate(container);

    FilterMediator.setHandleFilterInput(this.updateList.bind(this));
  }

  protected updateList() {
    const tracks = this.tracksModel.getTracks();

    const filteredTracks = FilterMediator.filterList(tracks, [
      "name",
      "singer",
      "album",
    ]);

    this.tracksListView.update(filteredTracks);
  }

  private markCurrentTrack(e: Event) {
    const customEvent = e as CustomEvent;
    const trackItems = document.querySelectorAll(".tracks__item");
    const currentTrackId = String(customEvent.detail);

    if (trackItems.length > 0) {
      trackItems.forEach((t) => {
        const trackId = t.getAttribute("id")!;

        t.classList.remove("playing");
        if (trackId === currentTrackId) t.classList.add("playing");
      });
    }
  }
}
