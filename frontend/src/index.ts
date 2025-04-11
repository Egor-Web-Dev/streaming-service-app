import "./css/style.css";
import { IUser } from "./interfaces/IUser";
import { AbstractView } from "./abstracts";
import { ApiPresenter } from "./api/ApiPresenter";
import { HeaderView } from "./components/Header";
import { FooterView } from "./components/Footer";
import { PlayerPresenter } from "./components/Player";
import { MainContentView } from "./components/MainContent";

class App extends AbstractView {
  private header: HeaderView;
  private main: MainContentView;
  private footer: FooterView;
  private player: PlayerPresenter;

  constructor(user: IUser) {
    super();

    this.header = new HeaderView(user);
    this.main = new MainContentView();
    this.footer = new FooterView();
    this.player = new PlayerPresenter();
  }

  renderTemplate(container: HTMLElement): void {
    this.removeTemplate();

    const template = this.createTemplate();

    this.container = container;
    this.container.append(template);
  }

  protected createTemplate(): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.classList.add("over-wrapper");

    wrapper.style.position = "relative";
    wrapper.style.overflow = "hidden";

    this.header.renderTemplate(wrapper);
    this.main.renderTemplate(wrapper);
    this.footer.renderTemplate(wrapper);
    this.player.render(wrapper);

    this.template = wrapper;
    return wrapper;
  }
}

ApiPresenter.auth().then((user) => {
  const rootContainer = document.getElementById("root")!;
  const app = new App(user);
  app.renderTemplate(rootContainer);
});
