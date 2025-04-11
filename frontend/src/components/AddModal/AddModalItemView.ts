import { SmartView } from "../../abstracts/";
import { ICustomPlaylist } from "../../interfaces/ICustomPlaylist";

export class AddModalItemView extends SmartView {
  private addSong: (playlistId: number) => Promise<ICustomPlaylist | void>;
  private openMessage: (isSuccess: boolean) => void;

  constructor(
    addSong: (playlistId: number) => Promise<ICustomPlaylist | void>,
    openMessage: (isSuccess: boolean) => void,
  ) {
    super();

    this.addSong = addSong;
    this.openMessage = openMessage;
  }

  renderTemplate(container: HTMLElement, playlist: ICustomPlaylist): void {
    const template = this.createTemplate(playlist);

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate(playlist: ICustomPlaylist): HTMLElement {
    const item = document.createElement("div");
    const itemImg = document.createElement("img");
    const itemTitle = document.createElement("div");
    const amountTracks = document.createElement("div");

    item.classList.add("playlists-modal__playlist");
    itemImg.classList.add("playlists-modal__playlist__image");
    itemTitle.classList.add("playlists-modal__playlist__title");
    amountTracks.classList.add("playlists-modal__playlist__info");

    itemTitle.textContent = playlist.name;
    amountTracks.textContent = `${playlist.amountSongs} треков`;

    itemImg.src = playlist.images[2];
    itemImg.alt = playlist.name;

    item.addEventListener("click", async () => {
      const customPlaylist = await this.addSong(playlist.id);
      const isSuccess = !!customPlaylist;

      if (isSuccess) this.update(customPlaylist);

      this.openMessage(isSuccess);
    });

    item.append(itemImg, itemTitle, amountTracks);

    this.template = item;
    return item;
  }

  update(item: ICustomPlaylist): void {
    const oldElement = this.template;
    const newItem = this.createTemplate(item);

    oldElement?.replaceWith(newItem);
  }
}
