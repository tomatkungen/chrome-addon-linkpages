interface iPageLinkItem {
    id        : number;
    title     : string;
    link      : string;
    subTitle? : string;
    groupby?  : string;
}

interface iPageLinkItems extends Array<iPageLinkItem> {};

export {
    iPageLinkItem,
    iPageLinkItems 
};