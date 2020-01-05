/*interface iBookmark {
    id        : string;   // "137"
    parentId  : string;   // "1"
    index     : number;   // 86
    url       : string;   // "https://developer.chrome.com/extensions/bookmarks#event-onCreated"
    title     : string;   // "chrome.bookmarks - Google Chrome"
    dataAdded : number;   // 1577135260264
  }*/
  
interface iBookmarkTreeNode {
    id                : string;
    parentId?         : string;
    index?            : number;
    url?              : string;
    title             : string;
    dateAdded?        : number;
    dateGroupModified?: number;
    children?         : (iBookmarkTreeNode)[];
}
  
export {
    /*iBookmark,*/
    iBookmarkTreeNode
};