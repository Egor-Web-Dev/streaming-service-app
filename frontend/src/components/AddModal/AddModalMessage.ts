import { AbstractView } from "../../abstracts";

export class AddModalMessageView extends AbstractView {
  constructor() {
    super();
  }

  renderTemplate(container: HTMLElement, isSuccess: boolean): void {
    this.removeTemplate();

    const template = this.createTemplate(isSuccess);

    this.container = container;
    this.container.prepend(template);

    setTimeout(() => {
      template.remove();
    }, 3000);
  }

  protected createTemplate(isSuccess: boolean): HTMLElement {
    const message = document.createElement("div");
    const messageText = document.createElement("span");

    const className = isSuccess
      ? "modal-message__success"
      : "modal-message__error";

    const innerText = isSuccess
      ? "Песня добавлена"
      : "Песня уже существует в плейлисте";

    message.classList.add("modal-message__container");
    messageText.classList.add(className);

    messageText.textContent = innerText;

    message.append(messageText);

    this.template = message;
    return message;
  }
}
