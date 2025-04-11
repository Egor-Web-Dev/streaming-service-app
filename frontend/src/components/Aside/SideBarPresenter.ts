import { SideBarView } from "./SideBarView";
import { PlaylistNavItem } from "../NavigationItem";
import { AbstractPresenter } from "../../abstracts";
import { IPlaylist } from "../../interfaces/IPlaylist";
import { ApiPresenter } from "../../api/ApiPresenter";
import { IPlaylistNavItem } from "../../interfaces/IPlaylistNavItem";

export class SideBarPresenter extends AbstractPresenter {
  private sideBarView: SideBarView;

  constructor(sideBarView: SideBarView) {
    super();
    this.sideBarView = sideBarView;
  }

  render(container: HTMLElement): void {
    this.getPlaylists().then((playlists) => {
      const navigationItems = this.convertPlaylists(playlists);
      this.sideBarView.renderTemplate(container, navigationItems);
    });
  }

  private convertPlaylists(playlists: IPlaylist[]): IPlaylistNavItem[] {
    const navigationItems: IPlaylistNavItem[] = [];

    playlists.forEach((p) => {
      const path = `/playlist/${p.id}`;
      const navItem = new PlaylistNavItem(p.name, +p.id, path);

      navigationItems.push(navItem);
    });

    return navigationItems;
  }

  private async getPlaylists(): Promise<IPlaylist[]> {
    const { getPlaylists } = ApiPresenter.getInstance();
    return (await getPlaylists()) || [];
  }
}
