import { AbstractView } from "../../abstracts";
import { icons } from "../../assets/img/icons";
import { PlayerControlRangeView } from "./PlayerControlRangeView";
import { IHandleControlClick } from "../../interfaces/IHandleControlClick";

const SHUFFLE_BTN_TITLE = "Перемешать";
const REPEAT_BTN_TITLE = "Повторить";
const NEXT_BTN_TITLE = "Следующий трек";
const PREV_BTN_TITLE = "Предыдущий трек";

export class PlayerControlView extends AbstractView {
  private controlsRange: PlayerControlRangeView;
  private handleControl: IHandleControlClick;

  constructor(
    controlsRange: PlayerControlRangeView,
    handleControl: IHandleControlClick,
  ) {
    super();

    this.controlsRange = controlsRange;
    this.handleControl = handleControl;
  }

  renderTemplate(container: HTMLElement): void {
    const template = this.createTemplate();

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate(): HTMLElement {
    const { shuffleImg, skipbackImg, skipnextImg, repeatImg } = icons;
    const { start, next, shuffle, loop } = this.handleControl;

    const playerContainer = document.createElement("div");
    const playerHeader = document.createElement("div");
    const shuffleBtn = document.createElement("button");
    const skipbackBtn = document.createElement("button");
    const playBtn = document.createElement("button");
    const skipnextBtn = document.createElement("button");
    const repeatBtn = document.createElement("button");

    playerContainer.classList.add("player__controls");
    playerHeader.classList.add("player__controls__header");
    shuffleBtn.classList.add("player__shaffle-btn");
    skipbackBtn.classList.add("player__skipback-btn");
    playBtn.classList.add("player__play-btn", "play");
    skipnextBtn.classList.add("player__skipnext-btn");
    repeatBtn.classList.add("player__repeat-btn");

    shuffleBtn.title = SHUFFLE_BTN_TITLE;
    skipbackBtn.title = PREV_BTN_TITLE;
    skipnextBtn.title = NEXT_BTN_TITLE;
    repeatBtn.title = REPEAT_BTN_TITLE;

    shuffleBtn.innerHTML = shuffleImg;
    skipbackBtn.innerHTML = skipbackImg;
    skipnextBtn.innerHTML = skipnextImg;
    repeatBtn.innerHTML = repeatImg;

    playBtn.addEventListener("click", () => {
      start();
    });

    skipnextBtn.addEventListener("click", () => {
      next();
    });

    skipbackBtn.addEventListener("click", () => {
      next(false);
    });

    shuffleBtn.addEventListener("click", () => {
      shuffle();
      shuffleBtn.classList.toggle("active");
    });

    repeatBtn.addEventListener("click", () => {
      loop();
      repeatBtn.classList.toggle("active");
    });

    playerHeader.append(
      shuffleBtn,
      skipbackBtn,
      playBtn,
      skipnextBtn,
      repeatBtn,
    );

    playerContainer.append(playerHeader);
    this.controlsRange.renderTemplate(playerContainer);

    this.template = playerContainer;
    return playerContainer;
  }
}
