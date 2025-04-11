import { IDefaultNavItem } from "../../interfaces/IDefaultNavItem";

export class DefaultNavItem implements IDefaultNavItem {
  readonly title: string;
  readonly path: string;
  readonly image: string;

  constructor(title: string, path: string, image: string) {
    this.title = title;
    this.path = path;
    this.image = image;
  }
}
