import { AbstractView } from "../../abstracts/AbstractView";

export class DeleteModalView extends AbstractView {
  private removeTrack: (trackId: number) => Promise<void>;

  constructor(removeTrackFn: (trackId: number) => Promise<void>) {
    super();
    this.removeTrack = removeTrackFn;
  }

  renderTemplate(container: HTMLElement, trackId: number): void {
    const template = this.createTemplate(trackId);
    this.container = container;
    this.container.append(template);
  }

  protected createTemplate(trackId: number): HTMLElement {
    const modalWrapper = document.createElement("div");
    const container = document.createElement("div");
    const title = document.createElement("div");
    const agreeBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");

    modalWrapper.classList.add("playlists-modal-wrapper");
    container.classList.add("playlists-modal");
    title.classList.add("delete-modal__title");
    agreeBtn.classList.add("delete-modal__agree-btn");
    cancelBtn.classList.add("delete-modal__close-btn");

    title.textContent = "Удалить из плейлиста";
    agreeBtn.textContent = "Да";
    cancelBtn.textContent = "Отмена";

    agreeBtn.addEventListener("click", async () => {
      await this.removeTrack(trackId);
      this.removeTemplate();
    });

    modalWrapper.addEventListener("click", (e) => {
      if (e.target === modalWrapper || e.target === cancelBtn) {
        this.removeTemplate();
      }
    });

    container.append(title, agreeBtn, cancelBtn);
    modalWrapper.append(container);

    this.template = modalWrapper;
    return modalWrapper;
  }
}
