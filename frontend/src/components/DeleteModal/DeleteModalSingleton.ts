import { DeleteModalView } from "./DeleteModalView";

export class DeleteModalSingleton {
  private static deleteModalView: DeleteModalView;

  private constructor() {}

  static init(removeTrackFn: (trackId: number) => Promise<void>): void {
    this.deleteModalView = new DeleteModalView(removeTrackFn);
  }

  static openModal(trackId: number): void {
    const container = document.getElementById("root")!;
    this.deleteModalView.renderTemplate(container, trackId);
  }
}
