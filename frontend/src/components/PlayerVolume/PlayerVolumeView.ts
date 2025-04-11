import { AbstractView } from "../../abstracts";
import { icons } from "../../assets/img/icons";
import { IHandleVolume } from "../../interfaces/IHandleVolume";

export class PlayerVolumeView extends AbstractView {
  private handleVolume: IHandleVolume;

  constructor(handleVolume: IHandleVolume) {
    super();
    this.handleVolume = handleVolume;
  }

  renderTemplate(container: HTMLElement): void {
    const template = this.createTemplate();

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate(): HTMLElement {
    const { volume, muteSound, changeVolume } = this.handleVolume;
    const volumeContainer = document.createElement("div");
    const volumeBtn = document.createElement("button");
    const volumeRange = document.createElement("input");

    volumeContainer.classList.add("player__value", "active");
    volumeBtn.classList.add("player__value-btn", "active");
    volumeRange.classList.add("player__value-range");

    volumeRange.id = "range-value";
    volumeRange.type = "range";
    volumeRange.valueAsNumber = volume;

    volumeBtn.innerHTML = icons.playerValueImg;

    const toggleClassVolume = () => {
      if (volumeRange.valueAsNumber === 0) {
        volumeBtn.classList.remove("active");
      } else {
        volumeBtn.classList.add("active");
      }
    };

    volumeBtn.addEventListener("click", () => {
      const volume = muteSound();

      volumeRange.valueAsNumber = volume * 100;
      toggleClassVolume();
    });

    volumeRange.addEventListener("input", () => {
      const volume = volumeRange.valueAsNumber / 100;

      changeVolume(volume);
      toggleClassVolume();
    });

    volumeContainer.append(volumeBtn, volumeRange);

    this.template = volumeContainer;
    return volumeContainer;
  }
}
