import { iBookmarkTreeNode } from "./interface/ibookmark";

declare let chrome: any;

class cBookmarks {
    constructor() {}

    public  onCreateBookmarkListener() {
        if (!this.isBookmarkActive()) return;

        chrome.bookmarks.onCreated.addListener((id: string, bookmark: iBookmarkTreeNode) => {
            console.log('Created bookmark');
        
        });
    }

    public async getBookMarkTree(): Promise<iBookmarkTreeNode[]> {

        return new Promise((resolve, reject) => {
            if (!this.isBookmarkActive()) return reject([]);

            chrome.bookmarks.getTree(
                (bookmarkTreeNode: any) => resolve(bookmarkTreeNode)
            )
        });

    }

    private isBookmarkActive(): boolean {
        return (chrome && chrome.bookmarks);
    }
}

export { cBookmarks };