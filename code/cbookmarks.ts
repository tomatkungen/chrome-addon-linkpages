import { iBookmarkTreeNode, iBookmarkListener } from "./interface/ibookmark";
import { eBOOKMARK_TYPE } from "./enum/ebookmark";
import { resolve } from "q";

declare let chrome: any;

class cBookmarks {

    // Enum listener types
    static eBOOKMARK_TYPE = eBOOKMARK_TYPE;

    private _bookmarkListeners: {type: eBOOKMARK_TYPE, listenerFn: iBookmarkListener}[];

    constructor() {

        // Activate Listeners
        this.activateListeners();

        // Listeners
        this._bookmarkListeners = [];
    }

    public async getBookMarkTree(): Promise<iBookmarkTreeNode[]> {

        return new Promise((resolve, reject) => {
            if (!this.isBookmarkActive()) return reject([]);

            chrome.bookmarks.getTree(
                (bookmarkTreeNode: any) => resolve(bookmarkTreeNode)
            )
        });

    }

    public async getBookMarkTreeById(id: string): Promise<iBookmarkTreeNode> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    public addEventListener(type: eBOOKMARK_TYPE, listenerFn: iBookmarkListener) {

        this._bookmarkListeners.push({
            type: type,
            listenerFn: listenerFn
        });

    }

    private activateListeners() {
        if (!this.isBookmarkActive()) return;

        this.onCreateBookmarkListener();
        this.onRemoveBookmarkListener();
        this.onChangeBookmarkListener();
        this.onMovedBookmarkListener();
    }

    private triggerBookmarkListener(type: eBOOKMARK_TYPE, id: string) {

        for(const bookmarkListener of this._bookmarkListeners) {
            if (
                bookmarkListener.type === type ||
                bookmarkListener.type === cBookmarks.eBOOKMARK_TYPE.ONALL
            ) {
                (async () => {
                    bookmarkListener.listenerFn(id, await this.getBookMarkTree());
                })();
            }
        }

    }

    private onCreateBookmarkListener() {
        if (!this.isBookmarkActive()) return;

        chrome.bookmarks.onCreated.addListener((id: string) => {
            console.log('Created bookmark');
            this.triggerBookmarkListener(cBookmarks.eBOOKMARK_TYPE.ONCREATED, id);
        });
    }

    private onRemoveBookmarkListener() {
        if (!this.isBookmarkActive()) return;

        chrome.bookmarks.onRemoved.addListener((id: string) => {
            this.triggerBookmarkListener(cBookmarks.eBOOKMARK_TYPE.ONREMOVED, id);
        });
    }

    private onChangeBookmarkListener() {
        if (!this.isBookmarkActive()) return;

        chrome.bookmarks.onChanged.addListener((id: string) => {
            this.triggerBookmarkListener(cBookmarks.eBOOKMARK_TYPE.ONCHANGED, id);
        });
    }

    private onMovedBookmarkListener() {
        if (!this.isBookmarkActive()) return;

        chrome.bookmarks.onMoved.addListener((id: string) => {
            this.triggerBookmarkListener(cBookmarks.eBOOKMARK_TYPE.ONMOVED, id);
        });
    }

    private isBookmarkActive(): boolean {
        return (chrome && chrome.bookmarks);
    }
}

export { cBookmarks };