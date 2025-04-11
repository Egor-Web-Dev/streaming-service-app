import { SmartView } from "../../abstracts";
import { ScreenPresenter } from "../Screen";
import { FilterMediator } from "../FIlterMediator";
import { SideBarPresenter, SideBarView } from "../Aside";

export class MainContentView extends SmartView {
  private sideBarPresenter: SideBarPresenter;
  private screenPresenter: ScreenPresenter;
  private sideBarView: SideBarView;

  constructor() {
    super();
    this.screenPresenter = new ScreenPresenter();
    this.sideBarView = new SideBarView();
    this.sideBarPresenter = new SideBarPresenter(this.sideBarView);

    window.addEventListener("popstate", () => {
      FilterMediator.clearFilter();
      this.update();
    });
  }

  renderTemplate(container: HTMLElement): void {
    const template = this.createTemplate();

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate(): HTMLElement {
    const mainContent = document.createElement("div");
    const main = document.createElement("main");

    mainContent.classList.add("content-wrap", "flex");
    main.classList.add("main");

    this.sideBarPresenter.render(mainContent);
    this.screenPresenter.render(main);

    mainContent.append(main);

    this.template = mainContent;
    return mainContent;
  }

  async update(): Promise<void> {
    await this.screenPresenter.renderCurrentPage();
    this.sideBarView.update();
  }
}
