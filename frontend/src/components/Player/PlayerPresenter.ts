import { PlayerView } from "./PlayerView";
import { PlayerModel } from "./PlayerModel";
import { AbstractPresenter } from "../../abstracts";
import { PlayerVolumePresenter } from "../PlayerVolume";
import { PlayerControlPresenter } from "../PlayerControl";
import { PlayerTrackCardView } from "./PlayerTrackCardView";

export class PlayerPresenter extends AbstractPresenter {
  private playerModel: PlayerModel;
  private playerView: PlayerView;
  private playerTrackCard: PlayerTrackCardView;
  private playerControls: PlayerControlPresenter;
  private playerVolume: PlayerVolumePresenter;
  private audio: HTMLAudioElement;

  constructor() {
    super();

    this.audio = new Audio();
    this.playerTrackCard = new PlayerTrackCardView();
    this.playerVolume = new PlayerVolumePresenter(this.audio);
    this.playerModel = new PlayerModel();
    this.playerControls = new PlayerControlPresenter(
      this.playerModel,
      this.audio,
      this.playerTrackCard,
    );

    this.playerView = new PlayerView(
      this.audio,
      this.playerTrackCard,
      this.playerControls,
      this.playerVolume,
    );
  }

  render(container: HTMLElement): void {
    this.playerView.renderTemplate(container);
  }
}
