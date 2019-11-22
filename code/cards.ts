import { cCard } from "./card";
import { iConfigurePageLink, iSettingCards } from "./structure";
import { Utils } from "./utils";

class cCards {
  private elmContainer: HTMLElement | null;

  private elmContainerId: string;

  private cCards: cCard[];

  private settings: iSettingCards;

  constructor(
    private configurepageLinks: iConfigurePageLink[],
    settings: {} = {}
  ) {
    this.elmContainerId = "container";
    this.elmContainer = Utils.getElmById(this.elmContainerId);
    this.cCards = [];
    this.settings = this.defaultSettings();

    Object.assign(this.settings, settings);
  }

  private defaultSettings(): iSettingCards {
    return {
      defaultCardHeight: 170, // Card Height
      defaultCardWidth: 250, // Card Width
      defaultWinHeight: window.innerHeight, // Window Height
      defaultwinWidth: window.innerWidth, // Window Width
      defaultCardSpaceWidth: 5, // Card width space
      defaultCardSpaceHeight: 5 // Card height space
    };
  }

  public render(): boolean {
    if (
      this.configurepageLinks &&
      this.configurepageLinks &&
      !this.configurepageLinks.length
    )
      return false;

    this.generateCards();
    this.setCardsSize();
    this.setCardsPosition();

    return true;
  }

  private generateCards() {
    if (!this.elmContainer) return;

    this.cCards = [];

    const htmlCards: string[] = [];
    this.configurepageLinks.forEach((configurePageLink: iConfigurePageLink) => {
      htmlCards.push(
        cCard.cardTemplate(
          configurePageLink.id,
          configurePageLink.title,
          configurePageLink.link,
          configurePageLink.subTitle
        )
      );

      this.cCards.push(new cCard(configurePageLink));
    });

    this.elmContainer.innerHTML = htmlCards.join();
  }

  private setCardsSize() {
    const onsCards: HTMLCollectionOf<Element> = Utils.getElmsByTagName(
      "ons-card"
    );

    if (!onsCards || !onsCards.length) return;

    Utils.loopOjbWithCallback(onsCards, onsCard => {
      const s = onsCard.style;
      s.width = Utils.convertIntToStylePixel(this.settings.defaultCardWidth);
      s.height = Utils.convertIntToStylePixel(this.settings.defaultCardHeight);
    });
  }

  private setCardsPosition(): void {
    const onsCards: HTMLCollectionOf<Element> = Utils.getElmsByTagName(
      "ons-card"
    );

    if (!onsCards || !onsCards.length) return;

    const totalCardsPerRow = Math.floor(
      this.settings.defaultwinWidth /
        (this.settings.defaultCardSpaceWidth * 2 +
          this.settings.defaultCardWidth)
    );

    let column = 0,
      row = 0;

    Utils.loopOjbWithCallback(onsCards, (onsCard, key, index) => {
      const s = onsCard.style;

      if (column >= totalCardsPerRow) {
        column = 0;
        row++;
      }

      s.position = "absolute";
      s.left = Utils.convertIntToStylePixel(
        (this.settings.defaultCardSpaceWidth * 2 +
          this.settings.defaultCardWidth) *
          column
      );
      s.top =
        (this.settings.defaultCardSpaceHeight * 2 +
          this.settings.defaultCardHeight) *
        row;

      column++;
    });
  }
}

const conf = [
  {
    id: 1,
    title: "Conflunce",
    subTitle: "Latest Wiki updates - Linköping",
    link: "https://axis-lkp.atlassian.net/wiki"
  },
  {
    id: 2,
    title: "Conflunce",
    subTitle: "Latest Wiki updates - Linköping",
    link: "https://axis-lkp.atlassian.net/wiki"
  }
];

export { cCards };

new cCards(conf).render();