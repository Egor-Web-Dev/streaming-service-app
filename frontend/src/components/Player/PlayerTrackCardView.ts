import { SmartView } from "../../abstracts";
import { icons } from "../../assets/img/icons";
import { ITrack } from "../../interfaces/ITrack";
import { ApiPresenter } from "../../api/ApiPresenter";

export class PlayerTrackCardView extends SmartView {
  constructor() {
    super();
  }

  renderTemplate(container: HTMLElement): void {
    const template = this.createTemplate();

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate(track?: ITrack): HTMLElement {
    const trackCard = document.createElement("div");
    const trackImage = document.createElement("img");
    const trackContent = document.createElement("div");
    const trackName = document.createElement("div");
    const subtitle = document.createElement("h3");
    const likeBtn = document.createElement("button");
    const trackAuthor = document.createElement("p");

    trackCard.classList.add("player__track-name", "flex");
    trackContent.classList.add("player__track-name__content");
    trackName.classList.add("flex", "player__name__header");
    subtitle.classList.add("player__track__h3");
    trackAuthor.classList.add("player__track__author");

    if (track) {
      const { id, name, image, singer, isLike } = track;

      trackCard.setAttribute("data-id", id.toString());

      trackImage.classList.add("player__track__img");
      likeBtn.classList.add("track__like-btn");

      if (isLike) {
        trackCard.classList.add("player__track--like");
      }

      trackImage.src = image;
      trackImage.alt = `${name} - ${singer}`;

      subtitle.textContent = name;
      trackAuthor.textContent = singer;
      likeBtn.innerHTML = icons.likeHeart;

      likeBtn.addEventListener("click", async () => {
        const isLike = !trackCard.classList.contains("player__track--like");
        const isSuccess = await this.likeTrack(id, isLike);

        if (isSuccess) {
          trackCard.classList.toggle("player__track--like");
        }
      });
    }

    trackName.append(subtitle, likeBtn);
    trackContent.append(trackName, trackAuthor);
    trackCard.append(trackImage, trackContent);

    this.template = trackCard;
    return this.template;
  }

  update(track: ITrack): void {
    const newTrackCard = this.createTemplate(track);
    const oldTrackCard = this.container?.querySelector(".player__track-name")!;

    this.container?.replaceChild(newTrackCard, oldTrackCard);
  }

  private async likeTrack(trackId: number, isLike: boolean): Promise<boolean> {
    const trackItem = document.getElementById(trackId.toString());
    const { likeSong } = ApiPresenter.getInstance();
    const song = await likeSong(trackId, isLike);

    if (!song) return false;

    trackItem?.classList.toggle("tracks__item--like");

    return true;
  }
}
