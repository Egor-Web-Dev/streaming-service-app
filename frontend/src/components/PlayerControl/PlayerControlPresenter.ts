import { BASE_URL } from "../../api/baseUrl";
import { ITrack } from "../../interfaces/ITrack";
import { AbstractPresenter } from "../../abstracts";
import { formatTime } from "../../utils/formatTime";
import { formatSong } from "../../utils/formatSong";
import { ApiPresenter } from "../../api/ApiPresenter";
import { PlayerControlView } from "./PlayerControlView";
import { PlayerTrackCardView, PlayerModel } from "../Player";
import { PlayerControlRangeView } from "./PlayerControlRangeView";
import { IHandleControlClick } from "../../interfaces/IHandleControlClick";

export class PlayerControlPresenter extends AbstractPresenter {
  private playerControl: PlayerControlView;
  private playerControlRange: PlayerControlRangeView;
  private playerModel: PlayerModel;
  private audio: HTMLAudioElement;
  private playerTrackCard: PlayerTrackCardView;

  constructor(
    playerModel: PlayerModel,
    audio: HTMLAudioElement,
    playerTrackCard: PlayerTrackCardView,
  ) {
    super();

    const start = this.handlePlayClick.bind(this);
    const next = this.playAnotherTrack.bind(this);
    const loop = this.loopTrack.bind(this);
    const rewind = this.rewind.bind(this);
    const shuffle = this.shuffle.bind(this);

    const handleControlClick: IHandleControlClick = {
      start,
      next,
      loop,
      shuffle,
      rewind,
    };

    this.audio = audio;
    this.playerModel = playerModel;
    this.playerTrackCard = playerTrackCard;

    this.playerControlRange = new PlayerControlRangeView(rewind);
    this.playerControl = new PlayerControlView(
      this.playerControlRange,
      handleControlClick,
    );

    this.attachAudioHandlers();

    window.addEventListener("clicktrack", this.playTrack.bind(this));
  }

  render(container: HTMLElement): void {
    this.playerControl.renderTemplate(container);
  }

  private async handlePlayClick(): Promise<void> {
    const { played, paused, play, pause } = this.audio;

    if (played.length === 0) {
      this.prePlay();

      const trackId = this.playerModel.getTrackId(0);

      if (trackId > 0) {
        await this.play(trackId);
      }
    } else if (paused) {
      await play.call(this.audio);
    } else {
      pause.call(this.audio);
    }

    this.togglePlayBtnState();
  }

  private togglePlayBtnState(): void {
    const playBtn = document.querySelector(".player__play-btn")!;
    const { paused } = this.audio;

    if (paused) {
      playBtn.classList.remove("pause");
    } else {
      playBtn.classList.add("pause");
    }
  }

  private async playTrack(e: Event): Promise<void> {
    const customEvent = e as CustomEvent;
    const trackId = customEvent.detail;

    const pageHeader = document.querySelector(".tracks__h2")!;
    const currentPageTitle = pageHeader.textContent!;

    const tracksPageTitle = this.playerModel.tracksPageName;

    if (currentPageTitle !== tracksPageTitle) {
      this.prePlay();
    }

    await this.play(trackId);
    this.togglePlayBtnState();
  }

  private prePlay(): void {
    const tracksPageHeader = document.querySelector(".tracks__h2")!;
    this.playerModel.tracksPageName = tracksPageHeader.textContent!;

    this.setTracksList();
  }

  private shuffle(): void {
    this.playerModel.shuffleTracks();
  }

  private async playAnotherTrack(isNext = true): Promise<void> {
    const playerModel = this.playerModel;

    const trackId = isNext
      ? playerModel.getNextTrackId()
      : playerModel.getPrevTrackId();

    if (trackId > 0) await this.play(trackId);

    this.togglePlayBtnState();
  }

  private loopTrack(): void {
    this.audio.loop = !this.audio.loop;
  }

  private attachAudioHandlers(): void {
    const audio = this.audio;

    audio.ontimeupdate = () => {
      this.updateProgress(audio.currentTime, audio.duration);
    };

    audio.onended = () => {
      this.playAnotherTrack();
    };
  }

  private async play(trackId: number): Promise<void> {
    const track = await this.getTrack(trackId);
    const path = `${BASE_URL}${track.path}`;
    const audio = this.audio;

    audio.src = path;
    audio.setAttribute("data-trackid", trackId.toString());

    audio.play();

    this.playerModel.setTrack(track);

    this.updatePlayer(track);
    this.dispatchPlayEvent(trackId);
  }

  private dispatchPlayEvent(trackId: number): void {
    const myEvent = new CustomEvent("playtrack", { detail: trackId });
    window.dispatchEvent(myEvent);
  }

  private rewind(progress: number): void {
    this.audio.currentTime = progress;
  }

  private updatePlayer(track: ITrack): void {
    this.playerTrackCard.update(track);
    this.playerControlRange.update(track.duration);
  }

  private updateProgress(currentTime: number, duration: number): void {
    const progress = (currentTime / duration) * 100 || 0;
    const timeStart = document.querySelector(".player__time-start")!;
    const playerRange: HTMLInputElement = document.querySelector(
      ".player__range-play",
    )!;

    playerRange.valueAsNumber = progress;
    timeStart.textContent = formatTime(currentTime);
  }

  private async getTrack(trackId: number): Promise<ITrack> {
    const { getSong } = ApiPresenter.getInstance();
    const song = await getSong(trackId);
    return formatSong(song!);
  }

  private setTracksList(): void {
    const trackItems = document.querySelectorAll(".tracks__item");

    if (trackItems.length > 0) {
      const tracks = Array.from(trackItems);
      const tracksIds = tracks.map((track) =>
        parseInt(track.getAttribute("id")!),
      );

      this.playerModel.setTracksList(tracksIds);
    }
  }
}
