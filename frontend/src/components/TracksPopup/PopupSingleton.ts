import { TrackPopupView } from "./TrackPopupView";
import { PopupAddButton } from "./PopupAddButton";
import { PopupDeleteButton } from "./PopupDeleteButton";

export class PopupSingleton {
  private static popupView: TrackPopupView;
  private static currentTrackId: number | null;

  private constructor() {}

  static init(popupState: "delete" | "add"): void {
    this.popupView = new TrackPopupView();

    if (popupState === "add") {
      this.popupView.popupButton = new PopupAddButton();
    } else {
      this.popupView.popupButton = new PopupDeleteButton();
    }
  }

  static openPopup(trackId: number): void {
    this.detachEventHandler();

    if (this.currentTrackId !== trackId) {
      const trackItem = document.getElementById(trackId.toString())!;

      this.currentTrackId = trackId;
      this.popupView.renderTemplate(trackItem, trackId);

      setTimeout(() => this.attachEventHandler());
    } else {
      this.deletePopup();
    }
  }

  private static deletePopup(): void {
    PopupSingleton.popupView.removeTemplate();
    PopupSingleton.currentTrackId = null;
  }

  private static attachEventHandler(): void {
    window.addEventListener("click", this.deletePopup);
  }

  private static detachEventHandler(): void {
    window.removeEventListener("click", this.deletePopup);
  }
}
