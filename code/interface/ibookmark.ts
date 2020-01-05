interface iBookmark {
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
      children    : (iBookmark | iBookmarkMap)[];
  }
  
  export {
    iBookmark,
    iBookmarkMap
  };