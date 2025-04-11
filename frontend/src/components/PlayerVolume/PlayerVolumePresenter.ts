import { AbstractPresenter } from "../../abstracts";
import { PlayerVolumeView } from "./PlayerVolumeView";
import { IHandleVolume } from "../../interfaces/IHandleVolume";

export class PlayerVolumePresenter extends AbstractPresenter {
  private audio: HTMLAudioElement;
  private volumeView: PlayerVolumeView;

  constructor(audio: HTMLAudioElement) {
    super();
    this.audio = audio;

    const muteSound = this.muteSound.bind(this);
    const changeVolume = this.changeVolume.bind(this);

    const handleVolumeChange: IHandleVolume = {
      volume: this.audio.volume * 100,
      muteSound,
      changeVolume,
    };

    this.volumeView = new PlayerVolumeView(handleVolumeChange);
  }

  render(container: HTMLElement): void {
    this.volumeView.renderTemplate(container);
  }

  private changeVolume(volume: number): void {
    this.audio.volume = volume;

    if (volume === 0) {
      this.audio.muted = true;
    } else {
      this.audio.muted = false;
    }
  }

  private muteSound(): number {
    const audio = this.audio;

    if (!audio.muted) {
      audio.muted = true;
      return 0;
    } else if (audio.muted && audio.volume === 0) {
      this.changeVolume(1);
      return 1;
    }

    audio.muted = false;
    return audio.volume;
  }
}
