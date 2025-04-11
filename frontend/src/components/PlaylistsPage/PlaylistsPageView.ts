import { AbstractView } from "../../abstracts";
import { PlaylistsPresenter } from "../PlaylistsList";

export class PlaylistsPageView extends AbstractView {
  private playlistsPresenter: PlaylistsPresenter;

  constructor() {
    super();

    this.playlistsPresenter = new PlaylistsPresenter();
  }

  renderTemplate(container: HTMLElement): void {
    const template = this.createTemplate();

    this.container = container;
    this.container.innerHTML = "";
    this.container.append(template);
  }

  protected createTemplate(): HTMLElement {
    const playlistsContainer = document.createElement("section");
    const heading = document.createElement("h2");

    playlistsContainer.classList.add("playlist", "section");
    heading.classList.add("playlist__h2", "title__h2");
    playlistsContainer.setAttribute("data-target", "playlists");
    heading.textContent = "Плейлисты";

    playlistsContainer.append(heading);
    this.playlistsPresenter.render(playlistsContainer);

    this.template = playlistsContainer;
    return playlistsContainer;
  }
}
