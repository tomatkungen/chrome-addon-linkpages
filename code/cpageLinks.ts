import { iPageLinkItems, iPageLinkItem } from "./interface/ipagelink";
import { cBookmarks } from "./cbookmarks";
import { iBookmarkTreeNode } from "./interface/ibookmark";
import { Utils } from "./sutils";

class cPageLinks {

    // Handle Bookmarks
    private _cBookmarks: cBookmarks;

    constructor() {
        this._cBookmarks = new cBookmarks();
    }

    public async getPageLinkItems(): Promise<iPageLinkItems> {

        let pageLinkItems: iPageLinkItems = [];

        try {
            this.pageLinkItemsFlatten(
                await this._cBookmarks.getBookMarkTree(),
                undefined,
                pageLinkItems
            );
        } catch (e) {
            return [];
        }

        return pageLinkItems;
    }

    private pageLinkItemsFlatten(bookmarkTreeNodes: iBookmarkTreeNode[],
                                 bookmarkTreeChild: iBookmarkTreeNode = { id: "0", title: "any"},
                                 pageLinkItems: iPageLinkItems): any {

        for (const bookmarkTreeNode of bookmarkTreeNodes) {

            if (bookmarkTreeNode.children) {

                this.pageLinkItemsFlatten(
                    bookmarkTreeNode.children,
                    bookmarkTreeNode,
                    pageLinkItems
                );

            } else {

                pageLinkItems.push({
                    id          : parseInt(bookmarkTreeNode.id, 10),
                    title       : Utils.approximateDomain(bookmarkTreeNode.url),
                    subTitle    : ( bookmarkTreeNode.title || 'No Description' ),
                    link        : ( bookmarkTreeNode.url || '' ),
                    groupBy     : parseInt(bookmarkTreeChild.id, 10),
                    groupTitle  : ( bookmarkTreeChild.title || '')
                });

            }
        }

    }
}

export { cPageLinks };