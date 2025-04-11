import { IUser } from "../../interfaces/IUser";
import { AbstractView } from "../../abstracts";
import { icons } from "../../assets/img/icons";
import { FilterMediator } from "../FIlterMediator";
import userImage from "../../assets/img/user.jpg";

export class HeaderView extends AbstractView {
  private user: IUser;
  private filter: HTMLInputElement;

  constructor(user: IUser) {
    super();

    this.user = user;
    this.filter = document.createElement("input");

    FilterMediator.init(this.filter);
  }

  renderTemplate(container: HTMLElement): void {
    const template = this.createTemplate();

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate(): HTMLElement {
    const header = document.createElement("header");
    const headerLogo = document.createElement("a");
    const searchContainer = document.createElement("div");
    const userProfile = document.createElement("button");
    const userPhoto = document.createElement("img");
    const userName = document.createElement("span");
    const userArrow = document.createElement("span");

    header.classList.add("header", "flex");
    headerLogo.classList.add("header__logo");
    searchContainer.classList.add("header__search");
    userProfile.classList.add("header__user");
    userPhoto.classList.add("header__user__img");
    userName.classList.add("header__user__text");
    this.filter.classList.add("header__search__field");

    headerLogo.href = "/";
    headerLogo.innerHTML = icons.headerLogoImg;

    this.filter.type = "search";
    this.filter.placeholder = "ЧТО БУДЕМ ИСКАТЬ?";

    userPhoto.src = userImage;
    userPhoto.alt = "Изображение пользователя";
    userName.textContent = this.user.username;
    userArrow.innerHTML = icons.arrow;

    searchContainer.append(this.filter);
    userProfile.append(userPhoto, userName, userArrow);
    header.append(headerLogo, searchContainer, userProfile);

    this.template = header;
    return header;
  }
}
