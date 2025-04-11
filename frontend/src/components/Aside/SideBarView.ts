import { SmartView } from "../../abstracts";
import { icons } from "../../assets/img/icons";
import { IDefaultNavItem } from "../../interfaces/IDefaultNavItem";
import { IPlaylistNavItem } from "../../interfaces/IPlaylistNavItem";
import {
  DefaultNavItem,
  DefaultNavItemView,
  PlaylistNavItemView,
} from "../NavigationItem";

const { asidePlaylistsImg, asideTracksImg, asideStarIcon } = icons;

const DEFAULT_NAV_ITEMS: IDefaultNavItem[] = [
  new DefaultNavItem("Треки", "/", asideTracksImg),
  new DefaultNavItem("Плейлисты", "/playlists", asidePlaylistsImg),
  new DefaultNavItem("Любимые песни", "/favorite", asideStarIcon),
];

export class SideBarView extends SmartView {
  private playlistNavItems: IPlaylistNavItem[] = [];

  constructor() {
    super();
  }

  renderTemplate(container: HTMLElement, navItems: IPlaylistNavItem[]): void {
    const template = this.createTemplate(navItems);

    this.playlistNavItems = navItems;
    this.container = container;
    this.container.prepend(template);
  }

  protected createTemplate(navItems: IPlaylistNavItem[]): HTMLElement {
    const aside = document.createElement("aside");
    const heading = document.createElement("h2");
    const navigation = document.createElement("nav");
    const navList = document.createElement("ul");
    const searchOpen = document.createElement("button");

    aside.classList.add("aside");
    heading.classList.add("aside__h2", "visually-hidden");
    navigation.classList.add("aside__nav");
    navList.classList.add("aside__list");
    searchOpen.classList.add("search__btn-open");
    searchOpen.innerHTML = icons.asideSearchOpn;

    const allNavItems = [...DEFAULT_NAV_ITEMS, ...navItems];

    for (const i of allNavItems) {
      const navItem =
        i instanceof DefaultNavItem
          ? new DefaultNavItemView()
          : new PlaylistNavItemView();

      navItem.renderTemplate(navList, i);
    }

    navigation.append(searchOpen, navList);
    aside.append(heading, navigation);

    this.template = aside;
    return aside;
  }

  update(): void {
    this.removeTemplate();
    this.renderTemplate(this.container!, this.playlistNavItems);
  }
}
