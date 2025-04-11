import { SmartView } from "../../abstracts";
import { TrackItemView } from "../TracksItem";
import { ITrack } from "../../interfaces/ITrack";

export class TracksListView extends SmartView {
  private tracks: ITrack[];

  constructor(tracks: ITrack[]) {
    super();
    this.tracks = tracks;
  }

  renderTemplate(container: HTMLElement): void {
    this.removeTemplate();

    const template = this.createTemplate();

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate(): HTMLElement {
    const tracksList = document.createElement("ul");
    const player = document.querySelector(".audio-player");
    const currentTrackId = player?.getAttribute("data-trackId")!;

    tracksList.classList.add("tracks__list");

    this.tracks.forEach((t) => {
      const isPlaying = +currentTrackId === t.id;
      new TrackItemView().renderTemplate(tracksList, t, isPlaying);
    });

    this.template = tracksList;
    return tracksList;
  }

  update(tracks: ITrack[]): void {
    this.tracks = tracks;
    this.renderTemplate(this.container!);
  }
}
