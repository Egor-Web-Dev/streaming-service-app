import { AbstractView } from "../../abstracts";

export class FooterView extends AbstractView {
  constructor() {
    super();
  }

  renderTemplate(container: HTMLElement): void {
    const template = this.createTemplate();

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate(): HTMLElement {
    const footer = document.createElement("footer");
    const copyRightContainer = document.createElement("div");
    const copyRight = document.createElement("p");
    const agreement = document.createElement("p");

    footer.classList.add("footer");
    copyRightContainer.classList.add("footer__content");

    copyRight.textContent = "© 2010-2024 Play_now";
    agreement.textContent =
      "ОАО «ABC» заключил лицензионные соглашения с крупнейшими российскими правообладателями на использование музыкальных произведений.";

    copyRightContainer.append(copyRight, agreement);
    footer.append(copyRightContainer);

    this.template = footer;
    return footer;
  }
}
