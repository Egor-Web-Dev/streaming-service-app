import { AbstractView } from "../../abstracts";
import { PlayerControlPresenter } from "../PlayerControl";
import { PlayerVolumePresenter } from "../PlayerVolume";
import { PlayerTrackCardView } from "./PlayerTrackCardView";

export class PlayerView extends AbstractView {
  private playerTrackCard: PlayerTrackCardView;
  private playerControl: PlayerControlPresenter;
  private playerVolume: PlayerVolumePresenter;
  private audio: HTMLAudioElement;

  constructor(
    audio: HTMLAudioElement,
    playerTrackCard: PlayerTrackCardView,
    playerControl: PlayerControlPresenter,
    playerVolume: PlayerVolumePresenter,
  ) {
    super();
    this.audio = audio;
    this.playerTrackCard = playerTrackCard;
    this.playerControl = playerControl;
    this.playerVolume = playerVolume;
  }

  renderTemplate(container: HTMLElement): void {
    const template = this.createTemplate();

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate(): HTMLElement {
    const container = document.createElement("div");
    const audio = this.audio;

    container.classList.add("player", "flex");
    audio.classList.add("audio-player", "hidden");

    audio.id = "audio-player";
    audio.preload = "none";
    audio.src = "";

    container.append(audio);

    this.playerTrackCard.renderTemplate(container);
    this.playerControl.render(container);
    this.playerVolume.render(container);

    this.template = container;
    return container;
  }
}
