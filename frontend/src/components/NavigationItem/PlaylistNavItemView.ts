import { IPlaylistNavItem } from "../../interfaces/IPlaylistNavItem";
import { NavigationItemView } from "./NavigationItemView";

export class PlaylistNavItemView extends NavigationItemView {
  constructor() {
    super();
  }

  protected createTemplate(playlistNavItem: IPlaylistNavItem): HTMLElement {
    const { title, path, playlistId } = playlistNavItem;
    const navItem = super.createTemplate({ title, path });

    navItem.setAttribute("data-playlistId", playlistId.toString());

    this.template = navItem;
    return navItem;
  }
}
