import { SmartView } from "../../abstracts";
import { formatTime } from "../../utils/formatTime";

export class PlayerControlRangeView extends SmartView {
  private rewind: (time: number) => void;

  constructor(rewind: (time: number) => void) {
    super();
    this.rewind = rewind;
  }

  renderTemplate(container: HTMLElement): void {
    const template = this.createTemplate();

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate(duration: number = 0): HTMLElement {
    const container = document.createElement("div");
    const timeStart = document.createElement("span");
    const rangePlay = document.createElement("input");
    const timeEnd = document.createElement("span");

    container.classList.add("player__controls__footer");
    timeStart.classList.add("player__time-start");
    rangePlay.classList.add("player__range-play");
    timeEnd.classList.add("player__time-end");

    timeEnd.textContent = formatTime(duration);
    timeStart.textContent = "0:00";

    rangePlay.id = "range-play";
    rangePlay.type = "range";
    rangePlay.step = "0.0000001";
    rangePlay.valueAsNumber = 0;

    rangePlay.addEventListener("input", () => {
      const progress = (parseInt(rangePlay.value) * duration) / 100;
      this.rewind(progress);
    });

    container.append(timeStart, rangePlay, timeEnd);

    this.template = container;
    return container;
  }

  update(duration: number): void {
    const newRange = this.createTemplate(duration);
    const oldRange = document.querySelector(".player__controls__footer")!;

    this.container?.replaceChild(newRange, oldRange);
  }
}
