import { icons } from "../../assets/img/icons";
import { PopupSingleton } from "..//TracksPopup";
import { ITrack } from "../../interfaces/ITrack";
import { AbstractView } from "../../abstracts";
import { formatTime } from "../../utils/formatTime";
import { ApiPresenter } from "../../api/ApiPresenter";
import { daysSinceDate } from "../../utils/daysSinceDate";

export class TrackItemView extends AbstractView {
  constructor() {
    super();
  }

  renderTemplate(
    container: HTMLElement,
    track: ITrack,
    isPlaying = false,
  ): void {
    this.container = container;

    const index = this.container.getElementsByTagName("li").length + 1;
    const template = this.createTemplate(track, index, isPlaying);

    this.container.append(template);
  }

  protected createTemplate(
    track: ITrack,
    index: number,
    isPlaying: boolean,
  ): HTMLElement {
    const {
      id,
      name,
      singer,
      album,
      duration,
      createdAt,
      image,
      path,
      isLike,
    } = track;
    const { likeHeart, dropdownImg } = icons;
    const trackItem = document.createElement("li");
    const trackNumber = document.createElement("div");
    const trackCard = document.createElement("div");
    const trackContent = document.createElement("div");
    const trackImage = document.createElement("img");
    const heading = document.createElement("h3");
    const trackLink = document.createElement("a");
    const author = document.createElement("span");
    const trackAlbum = document.createElement("div");
    const trackData = document.createElement("div");
    const dayAgoText = document.createElement("span");
    const likeBtn = document.createElement("button");
    const trackDuration = document.createElement("time");
    const trackDropContainer = document.createElement("div");
    const dropBtn = document.createElement("button");

    trackItem.classList.add("tracks__item", "flex");

    if (isPlaying) trackItem.classList.add("playing");
    if (isLike) trackItem.classList.add("tracks__item--like");

    trackCard.classList.add("tracks__item__name");
    trackImage.classList.add("track__img");
    trackContent.classList.add("track__content");
    heading.classList.add("track__name");
    trackLink.classList.add("track__name__link");
    author.classList.add("track__author");
    trackNumber.classList.add("tracks__item__number");
    trackAlbum.classList.add("tracks__item__albom");
    trackData.classList.add("tracks__item__data", "flex");
    dayAgoText.classList.add("data__text");
    likeBtn.classList.add("track__like-btn");
    trackDuration.classList.add("tracks__item__time");
    trackDropContainer.classList.add("tracks__item__drop");
    dropBtn.classList.add("track__btn-dropdown");

    trackAlbum.textContent = album;
    dayAgoText.textContent = `${daysSinceDate(createdAt)} дней назад`;
    trackDuration.textContent = formatTime(duration);
    trackNumber.textContent = index.toString();
    trackLink.textContent = name;
    author.textContent = singer;
    likeBtn.innerHTML = likeHeart;
    dropBtn.innerHTML = dropdownImg;

    trackItem.id = id.toString();

    trackImage.src = image;
    trackImage.alt = album;
    trackLink.href = "#";

    trackLink.addEventListener("click", (e) => {
      e.preventDefault();

      const myEvent = new CustomEvent("clicktrack", { detail: id });
      window.dispatchEvent(myEvent);
    });

    likeBtn.addEventListener("click", async () => {
      const isLike = !trackItem.classList.contains("tracks__item--like");
      const isSuccess = await this.likeTrack(id, isLike);

      if (isSuccess) trackItem.classList.toggle("tracks__item--like");
    });

    dropBtn.addEventListener("click", () => {
      PopupSingleton.openPopup(id);
      dropBtn.blur();
    });

    heading.append(trackLink);
    trackContent.append(heading, author);
    trackCard.append(trackImage, trackContent);
    trackDropContainer.append(dropBtn);
    trackData.append(dayAgoText, likeBtn);
    trackItem.append(
      trackNumber,
      trackCard,
      trackAlbum,
      trackData,
      trackDuration,
      trackDropContainer,
    );

    this.template = trackItem;
    return trackItem;
  }

  private async likeTrack(trackId: number, isLike: boolean): Promise<boolean> {
    const trackCard = document.querySelector(".player__track-name");
    const cardId = trackCard?.getAttribute("data-id");
    const { likeSong } = ApiPresenter.getInstance();
    const song = await likeSong(trackId, isLike);

    if (!song) return false;

    if (trackCard && cardId === trackId.toString()) {
      trackCard.classList.toggle("player__track--like");
    }

    return true;
  }
}
