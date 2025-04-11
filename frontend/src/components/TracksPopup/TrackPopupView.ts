import { PopupAddButton } from "./PopupAddButton";
import { AbstractView, AbstractPopupButton } from "../../abstracts";

export class TrackPopupView extends AbstractView {
  private popupBtn: AbstractPopupButton;

  constructor() {
    super();
    this.popupBtn = new PopupAddButton();
  }

  set popupButton(popupBtn: AbstractPopupButton) {
    this.popupBtn = popupBtn;
  }

  renderTemplate(container: HTMLElement, trackId: number): void {
    this.removeTemplate();

    const template = this.createTemplate(trackId);

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate(trackId: number): HTMLElement {
    const dropdownContainer = document.createElement("div");

    dropdownContainer.classList.add("track__dropdown", "dropdown--active");

    this.popupBtn.renderTemplate(dropdownContainer, trackId);

    this.template = dropdownContainer;
    return dropdownContainer;
  }
}
