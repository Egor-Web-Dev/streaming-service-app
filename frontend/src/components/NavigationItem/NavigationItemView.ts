import { AbstractView } from "../../abstracts";
import { INavigationItem } from "../../interfaces/INavigationItem";

export abstract class NavigationItemView extends AbstractView {
  constructor() {
    super();
  }

  renderTemplate(container: HTMLElement, navItem: INavigationItem): void {
    const template = this.createTemplate(navItem);

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate({ title, path }: INavigationItem): HTMLElement {
    const navItem = document.createElement("li");
    const navLink = document.createElement("a");
    const { href, origin } = location;
    const currentPath = href.replace(origin, "");

    navItem.classList.add("aside__item");
    navLink.classList.add("aside__btn");

    if (currentPath === path) {
      navLink.classList.add("aside__btn-active");
    }

    navLink.href = path;
    navLink.textContent = title;

    navLink.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState(null, "", path);

      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    navItem.append(navLink);

    this.template = navItem;
    return navItem;
  }
}
