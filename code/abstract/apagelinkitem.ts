import { iPageLinkItem } from "../interface/ipagelink";
import { Utils } from "./../sutils";
import { cDataStorage } from "./../cdatastorage";

abstract class aPageLinkItem {

    private _pageLinkItem: iPageLinkItem;

    constructor (pageLinkItem: iPageLinkItem) {
        this._pageLinkItem = pageLinkItem;

        this.addAnyAsDefaultGroup();
        this.addPageItemToStorage();
    }

    abstract template(): void;
   
    get pageLinkItem(): iPageLinkItem {
        return this._pageLinkItem;
    }

    public getTitle(): string {
        return ((this._pageLinkItem && this._pageLinkItem.title) || "");
    }

    public getLink(): string {
        return ((this._pageLinkItem && this._pageLinkItem.link) || "");
    }
    
    public getSubTitle(): string {
        return ((this._pageLinkItem && this._pageLinkItem.subTitle) || "");
    }

    public getGroupBy(): string {
        return ((this._pageLinkItem && this._pageLinkItem.groupby) || "");
    }

    public getId(): number {
        return this._pageLinkItem.id;
    }

    private addAnyAsDefaultGroup() {
        Utils.isObject(this._pageLinkItem) &&
        !this._pageLinkItem.groupby &&
        (this._pageLinkItem.groupby = "any");
    }

    private addPageItemToStorage() {
        if (cDataStorage.hasLocalStorage()) {
            cDataStorage.addJsonToStorage(
                this._pageLinkItem.id.toString(),
                this._pageLinkItem
            );
        }
    }
}

export { aPageLinkItem };