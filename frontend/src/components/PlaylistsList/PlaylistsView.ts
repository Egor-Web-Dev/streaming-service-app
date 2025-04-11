import { SmartView } from "../../abstracts";
import { PlaylistItemView } from "../PlaylistItem";
import { ICustomPlaylist } from "../../interfaces/ICustomPlaylist";

export class PlaylistsView extends SmartView {
  constructor() {
    super();
  }

  renderTemplate(container: HTMLElement, playlists: ICustomPlaylist[]): void {
    this.removeTemplate();

    const template = this.createTemplate(playlists);

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate(playlistsData: ICustomPlaylist[]): HTMLElement {
    const playlists = document.createElement("ul");
    playlists.classList.add("playlist__list");

    playlistsData.forEach((d) => {
      const playlistItem = new PlaylistItemView();
      playlistItem.renderTemplate(playlists, d);
    });

    this.template = playlists;
    return playlists;
  }

  update(playlistsData: ICustomPlaylist[]): void {
    this.renderTemplate(this.container!, playlistsData);
  }
}
