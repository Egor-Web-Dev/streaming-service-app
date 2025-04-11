import { AbstractPopupButton } from "../../abstracts";
import { DeleteModalSingleton } from "../DeleteModal";

export class PopupDeleteButton extends AbstractPopupButton {
  constructor() {
    super();
  }

  protected createTemplate(trackId: number): HTMLElement {
    const popupBtn = document.createElement("button");

    popupBtn.classList.add("track__delete-btn");
    popupBtn.textContent = "Удалить из плейлиста";

    popupBtn.addEventListener("click", () => {
      DeleteModalSingleton.openModal(trackId);
    });

    this.template = popupBtn;
    return popupBtn;
  }
}
