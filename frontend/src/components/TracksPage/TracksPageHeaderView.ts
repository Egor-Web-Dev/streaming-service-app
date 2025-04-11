import { AbstractView } from "../../abstracts";
import { icons } from "../../assets/img/icons";

export class TracksPageHeaderView extends AbstractView {
  constructor() {
    super();
  }

  renderTemplate(container: HTMLElement): void {
    const template = this.createTemplate();

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate(): HTMLElement {
    const { tracksHeaderDataImg, tracksHeaderTimeImg } = icons;
    const tracksHeader = document.createElement("div");
    const tracksHeaderNumber = document.createElement("div");
    const tracksHeaderName = document.createElement("div");
    const tracksHeaderAlbum = document.createElement("div");
    const tracksHeaderData = document.createElement("div");
    const tracksHeaderTime = document.createElement("div");

    tracksHeader.classList.add("tracks__header", "flex");
    tracksHeaderNumber.classList.add("tracks__header__number");
    tracksHeaderName.classList.add("tracks__header__name");
    tracksHeaderAlbum.classList.add("tracks__header__albom");
    tracksHeaderData.classList.add("tracks__header__data");
    tracksHeaderTime.classList.add("tracks__header__time");

    tracksHeaderNumber.textContent = "№";
    tracksHeaderName.textContent = "НАЗВАНИЕ";
    tracksHeaderAlbum.textContent = "АЛЬБОМ";

    tracksHeaderData.innerHTML = tracksHeaderDataImg;
    tracksHeaderTime.innerHTML = tracksHeaderTimeImg;

    tracksHeader.append(
      tracksHeaderNumber,
      tracksHeaderName,
      tracksHeaderAlbum,
      tracksHeaderData,
      tracksHeaderTime,
    );

    this.template = tracksHeader;
    return tracksHeader;
  }
}
