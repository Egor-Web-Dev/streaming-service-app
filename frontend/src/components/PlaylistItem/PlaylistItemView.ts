import { AbstractView } from "../../abstracts";
import { ICustomPlaylist } from "../../interfaces/ICustomPlaylist";

export class PlaylistItemView extends AbstractView {
  constructor() {
    super();
  }

  renderTemplate(container: HTMLElement, playlist: ICustomPlaylist): void {
    const template = this.createTemplate(playlist);

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate({
    name,
    amountSongs,
    path,
    images,
  }: ICustomPlaylist): HTMLElement {
    const [defaultImage, smallImage, mediumImage] = images;
    const item = document.createElement("li");
    const adaptiveImg = document.createElement("picture");
    const pathSmallImg = document.createElement("source");
    const pathMediumImg = document.createElement("source");
    const defaultImg = document.createElement("img");
    const playlistContent = document.createElement("div");
    const subtitle = document.createElement("h3");
    const subtitleLink = document.createElement("a");
    const countTracks = document.createElement("span");

    item.classList.add("playlist__item");
    defaultImg.classList.add("playlist__img");
    playlistContent.classList.add("playlist__content");
    subtitle.classList.add("playlist__h3");
    subtitleLink.classList.add("playlist__h3__link");
    countTracks.classList.add("playlist__count");

    subtitleLink.textContent = name;

    defaultImg.src = defaultImage;
    pathSmallImg.srcset = smallImage;
    pathMediumImg.srcset = mediumImage;
    subtitleLink.href = path;

    pathSmallImg.media = "(max-width: 576px)";
    pathMediumImg.media = "(max-width: 1440px)";
    defaultImg.alt = name;

    countTracks.textContent = `Треков ${amountSongs}`;

    subtitleLink.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState(null, "", subtitleLink.href);

      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    adaptiveImg.append(pathSmallImg, pathMediumImg, defaultImg);
    subtitle.append(subtitleLink);
    playlistContent.append(subtitle, countTracks);
    item.append(adaptiveImg, playlistContent);

    this.template = item;
    return item;
  }
}
