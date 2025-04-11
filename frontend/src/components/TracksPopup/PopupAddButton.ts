import { AddModalSingleton } from "../AddModal";
import { AbstractPopupButton } from "../../abstracts";

export class PopupAddButton extends AbstractPopupButton {
  constructor() {
    super();
  }

  protected createTemplate(trackId: number): HTMLElement {
    const popupBtn = document.createElement("button");

    popupBtn.classList.add("track__add-btn");
    popupBtn.textContent = "Добавить в плейлист";

    popupBtn.addEventListener("click", () => {
      AddModalSingleton.openModal(trackId);
    });

    this.template = popupBtn;
    return popupBtn;
  }
}
