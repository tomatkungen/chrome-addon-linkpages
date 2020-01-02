// Card item configure

interface iConfigurePageLink {
  id        : number;
  title     : string;
  link      : string;
  subTitle? : string;
  groupby?  : string;
}

// Card Settings

interface iSettingCards {
  defaultCardHeight       : number;
  defaultCardWidth        : number;
  defaultWinHeight        : number;
  defaultwinWidth         : number;
  defaultCardSpaceWidth   : number;
  defaultCardSpaceHeight  : number;
}

// Bookmark

interface iBookmarkSite {
  dataAdded : number;   // 1577135260264
  id        : string;   // "137"
  index     : number;   // 86
  parentId  : string;   // "1"
  title     : string;   // "chrome.bookmarks - Google Chrome"
  url       : string;   // "https://developer.chrome.com/extensions/bookmarks#event-onCreated"
}

interface iBookmarkMap {
    dateAdded   : number;
    id          : string;
    index       : number;
    parentId    : string;
    title       : string;
    children    : (iBookmarkSite | iBookmarkMap)[];
}

export {
  iConfigurePageLink,
  iSettingCards,
  iBookmarkSite,
  iBookmarkMap
};
