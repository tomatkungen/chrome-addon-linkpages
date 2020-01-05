var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*interface iBookmark {
    id        : string;   // "137"
    parentId  : string;   // "1"
    index     : number;   // 86
    url       : string;   // "https://developer.chrome.com/extensions/bookmarks#event-onCreated"
    title     : string;   // "chrome.bookmarks - Google Chrome"
    dataAdded : number;   // 1577135260264
  }*/
define("interface/ibookmark", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("cbookmarks", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class cBookmarks {
        constructor() { }
        onCreateBookmarkListener() {
            if (!this.isBookmarkActive())
                return;
            chrome.bookmarks.onCreated.addListener((id, bookmark) => {
                console.log('Created bookmark');
            });
        }
        getBookMarkTree() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    if (!this.isBookmarkActive())
                        return reject([]);
                    chrome.bookmarks.getTree((bookmarkTreeNode) => resolve(bookmarkTreeNode));
                });
            });
        }
        isBookmarkActive() {
            return (chrome && chrome.bookmarks);
        }
    }
    exports.cBookmarks = cBookmarks;
});
define("interface/ipagelink", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
});
define("interface/ibridge", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("cbridge", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class cBridge {
        constructor(brigde) {
            this._currentBridge = brigde;
        }
        render() {
            if (!this._currentBridge)
                return false;
            return this._currentBridge.render();
        }
        populate(iPageLinkItems) {
            if (!this._currentBridge)
                return;
            this._currentBridge.populate(iPageLinkItems);
        }
        guiSettings(settings) {
            if (!this._currentBridge)
                return;
            this._currentBridge.guiSettings(settings);
        }
    }
    exports.cBridge = cBridge;
});
define("sutils", ["require", "exports"], function (require, exports) {
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
                    callback(obj[key], key, index, obj);
                }
            });
        }
        static getElmsByTagName(id) {
            return document.getElementsByTagName(id);
        }
        static getElmById(id) {
            return document.getElementById(id);
        }
        static compareObjects(firstObj, secondObj) {
            return JSON.stringify(firstObj) === JSON.stringify(secondObj);
        }
        static isNotNumber(anyValue) {
            return window.isNaN(anyValue);
        }
        static approximateDomain(url = "http://localhost") {
            const urlDomain = new URL(url);
            return urlDomain.hostname.split('.').map((name, index, array) => {
                if (name === 'www' ||
                    (index > 0 &&
                        index === (array.length - 1) &&
                        Utils.isNotNumber(name)))
                    return '';
                return name;
            }).join(' ').trim() + (urlDomain.port === '' ? '' : ' : ' + urlDomain.port);
        }
    }
    exports.Utils = Utils;
});
define("cdatastorage", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class cDataStorage {
        constructor() { }
        static hasLocalStorage() {
            return window.localStorage ? true : false;
        }
        static addJsonToStorage(key, obj) {
            if (!cDataStorage.hasLocalStorage() || !obj)
                return;
            window.localStorage.setItem(key, JSON.stringify(obj));
            cDataStorage.addKey(key);
        }
        static getJsonFromStorage(key) {
            if (!cDataStorage.hasLocalStorage() || key === "")
                return {};
            return JSON.parse(window.localStorage.getItem(key) || "");
        }
        static addKey(key) {
            if (!cDataStorage.hasLocalStorage())
                return;
            let aryKeys = JSON.parse(window.localStorage.getItem("key") || "[]");
            // If key already exists then return
            if (aryKeys.includes(key))
                return;
            (!aryKeys && (aryKeys = []) && aryKeys.push(key)) || aryKeys.push(key);
            window.localStorage.setItem("key", JSON.stringify(aryKeys));
        }
    }
    exports.cDataStorage = cDataStorage;
});
define("abstract/apagelinkitem", ["require", "exports", "sutils", "cdatastorage"], function (require, exports, sutils_1, cdatastorage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class aPageLinkItem {
        constructor(pageLinkItem) {
            this._pageLinkItem = pageLinkItem;
            this.addAnyAsDefaultGroup();
            this.addPageItemToStorage();
        }
        get pageLinkItem() {
            return this._pageLinkItem;
        }
        getTitle() {
            return ((this._pageLinkItem && this._pageLinkItem.title) || "");
        }
        getLink() {
            return ((this._pageLinkItem && this._pageLinkItem.link) || "");
        }
        getSubTitle() {
            return ((this._pageLinkItem && this._pageLinkItem.subTitle) || "");
        }
        getGroupBy() {
            return ((this._pageLinkItem && this._pageLinkItem.groupBy) || 0);
        }
        getId() {
            return this._pageLinkItem.id;
        }
        addAnyAsDefaultGroup() {
            sutils_1.Utils.isObject(this._pageLinkItem) &&
                !this._pageLinkItem.groupTitle &&
                (this._pageLinkItem.groupTitle = "any");
        }
        addPageItemToStorage() {
            if (cdatastorage_1.cDataStorage.hasLocalStorage()) {
                cdatastorage_1.cDataStorage.addJsonToStorage(this._pageLinkItem.id.toString(), this._pageLinkItem);
            }
        }
    }
    exports.aPageLinkItem = aPageLinkItem;
});
define("ccard", ["require", "exports", "abstract/apagelinkitem"], function (require, exports, apagelinkitem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class cCard extends apagelinkitem_1.aPageLinkItem {
        constructor(pageLinkItem) {
            super(pageLinkItem);
        }
        template() {
            return `
            <a id="${super.getId()}" href="${super.getLink()}" target="_blank">
                <ons-card class="over">
                    <div class="head-title">
                        <h2>${super.getTitle()}</h2>
                    </div>
                    <div class="sub-title">
                        <span>${super.getSubTitle()}</p>
                    </div>
                </ons-card>
            </a>
        `;
        }
    }
    exports.cCard = cCard;
});
define("interface/isetting", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("abstract/alayout", ["require", "exports", "sutils"], function (require, exports, sutils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class aLayout {
        constructor() {
            // Element Container Id
            this._elmContainerId = 'container';
            this._settings = {
                winHeight: window.innerHeight,
                winWidth: window.innerWidth // Window Width
            };
            this._elmContainer = sutils_2.Utils.getElmById(this._elmContainerId);
            this._pageLinkItems = [];
        }
        set settings(settings) {
            Object.assign(this._settings, settings);
        }
        get settings() {
            return this._settings;
        }
        get container() {
            return this._elmContainer;
        }
        set pageLinkItems(pageLinkItems) {
            this._pageLinkItems = pageLinkItems;
        }
        get pageLinkItems() {
            return this._pageLinkItems;
        }
        hasPageLinkItems() {
            return !!(this._pageLinkItems && this._pageLinkItems.length);
        }
        hasContainer() {
            return (!!this._elmContainer);
        }
        extend(first, second) {
            const result = {};
            for (const prop in first) {
                if (first[prop]) {
                    result[prop] = first[prop];
                }
            }
            for (const prop in second) {
                if (second[prop]) {
                    result[prop] = second[prop];
                }
            }
            return result;
        }
    }
    exports.aLayout = aLayout;
});
define("ccards", ["require", "exports", "ccard", "sutils", "abstract/alayout"], function (require, exports, ccard_1, sutils_3, alayout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class cCards extends alayout_1.aLayout {
        constructor() {
            super();
            this._cCards = [];
            this._settingCard = {
                cardHeight: 170,
                cardWidth: 250,
                cardSpaceWidth: 5,
                cardSpaceHeight: 5 // Card height space
            };
        }
        guiSettings(settings) {
            if (!settings ||
                !sutils_3.Utils.compareObjects(settings, this._settingCard))
                return;
            this._settingCard = {
                cardHeight: settings.cardHeight,
                cardWidth: settings.cardWidth,
                cardSpaceWidth: settings.cardSpaceWidth,
                cardSpaceHeight: settings.cardSpaceHeight // Card height space
            };
            this.render();
        }
        populate(iPageLinkItems) {
            super.pageLinkItems = iPageLinkItems;
        }
        render() {
            if (!super.hasPageLinkItems())
                return false;
            // Generate Cards
            this._cCards = [];
            this.generateCards();
            if (!super.container)
                return false;
            // Render Cards
            super.container.innerHTML = this._cCards.map((cCard) => {
                return cCard.template();
            }).join('');
            // Adjust Cards
            this.setCardsSize();
            this.setCardsPosition();
            return true;
        }
        generateCards() {
            for (const pageLinkItem of super.pageLinkItems) {
                this._cCards.push(new ccard_1.cCard(pageLinkItem));
            }
        }
        setCardsSize() {
            const onsCards = sutils_3.Utils.getElmsByTagName("ons-card");
            if (!onsCards || !onsCards.length)
                return;
            sutils_3.Utils.loopOjbWithCallback(onsCards, onsCard => {
                const s = onsCard.style;
                s.width = sutils_3.Utils.convertIntToStylePixel(this._settingCard.cardWidth);
                s.height = sutils_3.Utils.convertIntToStylePixel(this._settingCard.cardHeight);
            });
        }
        setCardsPosition() {
            const onsCards = sutils_3.Utils.getElmsByTagName("ons-card");
            if (!onsCards || !onsCards.length)
                return;
            const totalCardsPerRow = Math.floor(super.settings.winWidth /
                (this._settingCard.cardSpaceWidth * 2 +
                    this._settingCard.cardWidth));
            let column = 0, row = 0;
            sutils_3.Utils.loopOjbWithCallback(onsCards, (onsCard, key, index) => {
                const s = onsCard.style;
                if (column >= totalCardsPerRow) {
                    column = 0;
                    row++;
                }
                s.position = "absolute";
                s.left = sutils_3.Utils.convertIntToStylePixel((this._settingCard.cardSpaceWidth * 2 +
                    this._settingCard.cardWidth) * column);
                s.top = (this._settingCard.cardSpaceHeight * 2 +
                    this._settingCard.cardHeight) * row;
                column++;
            });
        }
    }
    exports.cCards = cCards;
});
define("cpageLinks", ["require", "exports", "cbookmarks", "sutils"], function (require, exports, cbookmarks_1, sutils_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class cPageLinks {
        constructor() {
            this._cBookmarks = new cbookmarks_1.cBookmarks();
        }
        getPageLinkItems() {
            return __awaiter(this, void 0, void 0, function* () {
                let pageLinkItems = [];
                try {
                    this.pageLinkItemsFlatten(yield this._cBookmarks.getBookMarkTree(), undefined, pageLinkItems);
                }
                catch (e) {
                    return [];
                }
                return pageLinkItems;
            });
        }
        pageLinkItemsFlatten(bookmarkTreeNodes, bookmarkTreeChild = { id: "0", title: "any" }, pageLinkItems) {
            for (const bookmarkTreeNode of bookmarkTreeNodes) {
                if (bookmarkTreeNode.children) {
                    this.pageLinkItemsFlatten(bookmarkTreeNode.children, bookmarkTreeNode, pageLinkItems);
                }
                else {
                    pageLinkItems.push({
                        id: parseInt(bookmarkTreeNode.id, 10),
                        title: sutils_4.Utils.approximateDomain(bookmarkTreeNode.url),
                        subTitle: (bookmarkTreeNode.title || 'No Description'),
                        link: (bookmarkTreeNode.url || ''),
                        groupBy: parseInt(bookmarkTreeChild.id, 10),
                        groupTitle: (bookmarkTreeChild.title || '')
                    });
                }
            }
        }
    }
    exports.cPageLinks = cPageLinks;
});
define("cmain", ["require", "exports", "cbridge", "ccards", "cpageLinks"], function (require, exports, cbridge_1, ccards_1, cpageLinks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class cMain {
        constructor() {
            this._aryGuiComponents = [new ccards_1.cCards()];
            this._cBrigde = new cbridge_1.cBridge(this._aryGuiComponents[this._aryGuiComponents.length - 1]);
            this._cPageLinks = new cpageLinks_1.cPageLinks();
        }
        main() {
            (() => __awaiter(this, void 0, void 0, function* () {
                this._cBrigde.populate(yield this._cPageLinks.getPageLinkItems());
                this._cBrigde.guiSettings(null);
                this._cBrigde.render();
            }))();
        }
    }
    new cMain().main();
});
