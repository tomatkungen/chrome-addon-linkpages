interface iPageLinkItem {
    id          : number;
    title       : string;
    link        : string;
    subTitle?   : string;
    groupTitle? : string;
    groupBy?    : number;
}

interface iPageLinkItems extends Array<iPageLinkItem> {};

export {
    iPageLinkItem,
    iPageLinkItems 
};