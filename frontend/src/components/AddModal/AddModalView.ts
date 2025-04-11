import { AbstractView } from "../../abstracts";
import { AddModalItemView } from "./AddModalItemView";
import { AddModalMessageView } from "./AddModalMessage";
import { ICustomPlaylist } from "../../interfaces/ICustomPlaylist";

export class AddModalView extends AbstractView {
  private modalMessagePopup: AddModalMessageView;
  private addSong: (playlistId: number) => Promise<ICustomPlaylist | void>;

  constructor(
    addSong: (playlistId: number) => Promise<ICustomPlaylist | void>,
  ) {
    super();

    this.modalMessagePopup = new AddModalMessageView();
    this.addSong = addSong;
  }

  renderTemplate(container: HTMLElement, playlists: ICustomPlaylist[]): void {
    const template = this.createTemplate(playlists);

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate(playlists: ICustomPlaylist[]): HTMLElement {
    const modalWrapper = document.createElement("div");
    const container = document.createElement("div");
    const title = document.createElement("div");
    const content = document.createElement("div");
    const footer = document.createElement("div");
    const cancelBtn = document.createElement("button");

    modalWrapper.classList.add("playlists-modal-wrapper");
    container.classList.add("playlists-modal");
    title.classList.add("playlists-modal__title");
    content.classList.add("playlists-modal__playlist_content");
    footer.classList.add("playlists-modal__footer");
    cancelBtn.classList.add("playlists-modal__close-btn");

    title.textContent = "Добавить в плейлист";
    cancelBtn.textContent = "Отменить";

    const renderMessagePopup = this.modalMessagePopup.renderTemplate.bind(
      this.modalMessagePopup,
      container,
    );

    playlists.forEach((p) => {
      const modalItem = new AddModalItemView(this.addSong, renderMessagePopup);
      modalItem.renderTemplate(content, p);
    });

    modalWrapper.addEventListener("click", (e) => {
      if (e.target === modalWrapper || e.target === cancelBtn) {
        this.removeTemplate();
        this.container!.style.overflow = "auto";
      }
    });

    footer.append(cancelBtn);
    container.append(title, content, footer);
    modalWrapper.append(container);

    this.template = modalWrapper;
    return modalWrapper;
  }
}
