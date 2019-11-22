define("structure", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Utils {
        constructor() { }
        static isObject(obj) {
            return typeof obj === "object";
        }
        static convertIntToStylePixel(value) {
            return value + "px";
        }
        static loopOjbWithCallback(obj, callback) {
            if (!Utils.isObject(obj))
                return;
            Object.keys(obj).forEach((key, index) => {
                if (callback && key && obj[key]) {
                }
                callback(obj[key], key, index, obj);
            });
        }
        static getElmsByTagName(id) {
            return document.getElementsByTagName(id);
        }
        static getElmById(id) {
            return document.getElementById(id);
        }
    }
    exports.Utils = Utils;
});
define("card", ["require", "exports", "utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class cCard {
        constructor(configurePageLink) {
            this.configurePageLink = configurePageLink;
            this.addDefaultGroup();
            this.cardId = "ons-card";
        }
        addDefaultGroup() {
            utils_1.Utils.isObject(this.configurePageLink) &&
                !this.configurePageLink.groupby &&
                (this.configurePageLink.groupby = "any");
        }
        static cardTemplate(id, title, link, subTitle) {
            return `
      <a id="${id}" href="${link}" target="_blank">
        <ons-card class="over">
          <div class="head-title">
            <h2>${title}</h2>
          </div>
          <div class="sub-title">
            <h5>${subTitle}</h5>
          </div>
        </ons-card>
      </a>
    `;
        }
        getTitle() {
            return (this.configurePageLink && this.configurePageLink.title) || "";
        }
        getLink() {
            return (this.configurePageLink && this.configurePageLink.link) || "";
        }
        getSubTitle() {
            return (this.configurePageLink && this.configurePageLink.subTitle) || "";
        }
        getGroupBy() {
            return (this.configurePageLink && this.configurePageLink.groupby) || "";
        }
        getId() {
            return this.configurePageLink.id;
        }
        saveCard() {
            return false;
        }
    }
    exports.cCard = cCard;
});
define("cards", ["require", "exports", "card", "utils"], function (require, exports, card_1, utils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class cCards {
        constructor(configurepageLinks, settings = {}) {
            this.configurepageLinks = configurepageLinks;
            this.elmContainerId = "container";
            this.elmContainer = utils_2.Utils.getElmById(this.elmContainerId);
            this.cCards = [];
            this.settings = this.defaultSettings();
            Object.assign(this.settings, settings);
        }
        defaultSettings() {
            return {
                defaultCardHeight: 170,
                defaultCardWidth: 250,
                defaultWinHeight: window.innerHeight,
                defaultwinWidth: window.innerWidth,
                defaultCardSpaceWidth: 5,
                defaultCardSpaceHeight: 5 // Card height space
            };
        }
        render() {
            if (this.configurepageLinks &&
                this.configurepageLinks &&
                !this.configurepageLinks.length)
                return false;
            this.generateCards();
            this.setCardsSize();
            this.setCardsPosition();
            return true;
        }
        generateCards() {
            if (!this.elmContainer)
                return;
            this.cCards = [];
            const htmlCards = [];
            this.configurepageLinks.forEach((configurePageLink) => {
                htmlCards.push(card_1.cCard.cardTemplate(configurePageLink.id, configurePageLink.title, configurePageLink.link, configurePageLink.subTitle));
                this.cCards.push(new card_1.cCard(configurePageLink));
            });
            this.elmContainer.innerHTML = htmlCards.join();
        }
        setCardsSize() {
            const onsCards = utils_2.Utils.getElmsByTagName("ons-card");
            if (!onsCards || !onsCards.length)
                return;
            utils_2.Utils.loopOjbWithCallback(onsCards, onsCard => {
                const s = onsCard.style;
                s.width = utils_2.Utils.convertIntToStylePixel(this.settings.defaultCardWidth);
                s.height = utils_2.Utils.convertIntToStylePixel(this.settings.defaultCardHeight);
            });
        }
        setCardsPosition() {
            const onsCards = utils_2.Utils.getElmsByTagName("ons-card");
            if (!onsCards || !onsCards.length)
                return;
            const totalCardsPerRow = Math.floor(this.settings.defaultwinWidth /
                (this.settings.defaultCardSpaceWidth * 2 +
                    this.settings.defaultCardWidth));
            let column = 0, row = 0;
            utils_2.Utils.loopOjbWithCallback(onsCards, (onsCard, key, index) => {
                const s = onsCard.style;
                if (column >= totalCardsPerRow) {
                    column = 0;
                    row++;
                }
                s.position = "absolute";
                s.left = utils_2.Utils.convertIntToStylePixel((this.settings.defaultCardSpaceWidth * 2 +
                    this.settings.defaultCardWidth) *
                    column);
                s.top =
                    (this.settings.defaultCardSpaceHeight * 2 +
                        this.settings.defaultCardHeight) *
                        row;
                column++;
            });
        }
    }
    exports.cCards = cCards;
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
    new cCards(conf).render();
});
