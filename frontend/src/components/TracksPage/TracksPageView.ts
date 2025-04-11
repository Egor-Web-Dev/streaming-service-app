import { AbstractView } from "../../abstracts";
import { TracksListPresenter } from "../TracksList";
import { TracksPageHeaderView } from "./TracksPageHeaderView";

export class TracksPageView extends AbstractView {
  private title: string;
  private tracksHeader: TracksPageHeaderView;
  private tracksListPresenter: TracksListPresenter;

  constructor(pageTitle: string, tracksListPresenter: TracksListPresenter) {
    super();

    this.title = pageTitle;
    this.tracksHeader = new TracksPageHeaderView();
    this.tracksListPresenter = tracksListPresenter;
  }

  renderTemplate(container: HTMLElement): void {
    const template = this.createTemplate();

    this.container = container;
    this.container.innerHTML = "";
    this.container.append(template);
  }

  protected createTemplate(): HTMLElement {
    const tracksContainer = document.createElement("section");
    const heading = document.createElement("h2");
    const tracksContent = document.createElement("div");

    heading.classList.add("tracks__h2", "title__h2");
    tracksContent.classList.add("tracks__content");
    tracksContainer.classList.add(
      "tracks",
      "section",
      "tabs-content",
      "section--active",
    );

    tracksContainer.setAttribute("data-target", "tracks");

    heading.textContent = this.title;

    this.tracksHeader.renderTemplate(tracksContent);
    this.tracksListPresenter.render(tracksContent);
    tracksContainer.append(heading, tracksContent);

    this.template = tracksContainer;
    return tracksContainer;
  }
}
