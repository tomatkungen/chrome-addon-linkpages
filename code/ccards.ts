import { cCard } from "./ccard";
import { Utils } from "./sutils";
import { iBridge } from "./interface/ibridge";
import { iPageLinkItems } from "./interface/ipagelink";
import { aLayout } from "./abstract/alayout";
import { iSettingCard } from "./interface/isetting";

class cCards extends aLayout implements iBridge {

    // Array of cards
    private _cCards: cCard[];

    // Settings for card style
    private _settingCard: iSettingCard;

    constructor() {
        super();

        this._cCards      = [];
        this._settingCard = {
          cardHeight      : 170,  // Card Height
          cardWidth       : 250,  // Card Width
          cardSpaceWidth  : 5,    // Card width space
          cardSpaceHeight : 5     // Card height space
        };
    }

    public guiSettings<T>(settings: T & iSettingCard | null) {
        if (
            !settings ||
            !Utils.compareObjects(settings, this._settingCard)
        ) return;

        this._settingCard = {
            cardHeight      : settings.cardHeight,          // Card Height
            cardWidth       : settings.cardWidth,           // Card Width
            cardSpaceWidth  : settings.cardSpaceWidth,      // Card width space
            cardSpaceHeight : settings.cardSpaceHeight      // Card height space
        };

        this.render();
    }

    public populate(iPageLinkItems: iPageLinkItems) {
        super.pageLinkItems = iPageLinkItems;
    }

    public render(): boolean {
        if (!super.hasPageLinkItems()) return false;

        // Generate Cards
        this._cCards = [];
        this.generateCards();

        if (!super.container) return false;

        // Render Cards
        super.container.innerHTML = this._cCards.map((cCard: cCard) => {
            return cCard.template();
        }).join('');

        // Adjust Cards
        this.setCardsSize();
        this.setCardsPosition();

        return true;
    }

    private generateCards() {

        for (const pageLinkItem of super.pageLinkItems) {
            this._cCards.push(new cCard(pageLinkItem));
        }

    }

    private setCardsSize() {
        const onsCards: HTMLCollectionOf<Element> = Utils.getElmsByTagName(
            "ons-card"
        );

        if (!onsCards || !onsCards.length) return;

        Utils.loopOjbWithCallback(onsCards, onsCard => {
            const s = onsCard.style;
            s.width = Utils.convertIntToStylePixel(this._settingCard.cardWidth);
            s.height = Utils.convertIntToStylePixel(this._settingCard.cardHeight);
        });
    }

    private setCardsPosition(): void {
        const onsCards: HTMLCollectionOf<Element> = Utils.getElmsByTagName(
            "ons-card"
        );

        if (!onsCards || !onsCards.length) return;

        const totalCardsPerRow = Math.floor(
            super.settings.winWidth /
            (
                this._settingCard.cardSpaceWidth * 2 +
                this._settingCard.cardWidth
            )
        );

        let column = 0, row = 0;

        Utils.loopOjbWithCallback(onsCards, (onsCard, key, index) => {
            const s = onsCard.style;

            if (column >= totalCardsPerRow) {
                column = 0;
                row++;
            }

            s.position = "absolute";
            s.left = Utils.convertIntToStylePixel((
                    this._settingCard.cardSpaceWidth * 2 +
                    this._settingCard.cardWidth
            ) * column);
            s.top = (
                this._settingCard.cardSpaceHeight * 2 +
                this._settingCard.cardHeight
            ) * row;

            column++;
        });
    }
}

export { cCards };