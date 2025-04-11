import { NavigationItemView } from "./NavigationItemView";
import { IDefaultNavItem } from "../../interfaces/IDefaultNavItem";

export class DefaultNavItemView extends NavigationItemView {
  constructor() {
    super();
  }

  protected createTemplate(navItemData: IDefaultNavItem): HTMLElement {
    const navItem = super.createTemplate(navItemData);
    const navBtn = navItem.querySelector(".aside__btn")!;
    const navBtnText = document.createElement("span");

    navBtn.classList.add("aside__tabs-btn");

    navBtnText.textContent = navItemData.title;
    navItemData.image && (navBtn.innerHTML = navItemData.image);

    navBtn.append(navBtnText);

    this.template = navItem;
    return navItem;
  }
}
