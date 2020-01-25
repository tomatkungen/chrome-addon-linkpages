
### **Chrome addon linkpage - Objekt Orienterad Ascii Design**

##### Classes
```    
    - cCards            // Holds every card
    - cCard             // Describe card
    - cBookmarks        // Bookmark extension permission
    - cBrigde           // Bridge pattern
        - iBrigdeInterface Methods
            - Render()
            - Populate(iPageLinkItems[])
            - GuiSettings
    - cDataStorage      // Local storage
    - cMain             // Start method
    - cPageLinks        // Collects all bookmarks items
        - Convert from bookmarksItem -> pageLinkItem
 ```   

##### Interfaces
```
    - iBookmark
    - iBridge
    - iPageLink
    - iSettings
```

##### Abstract Classes
```
    - aLayout
    - aPageLinkItem
```

##### Enum
```
    - eBookMarkType
```

##### OOA - Design
```
    | aLayout |
        |                | aPageLinkItem |
    | iBridge |                  ^
        |                        |    
    | cCards |<------------->| cCard  |
        ^   
        |                                  | aLayout |
        |                                      |
        | | iBridgeInterface |             | iBrigde |         | aPageLinkItem |
        |    ^                                 ^                       ^
        |    |                                 |                       |
    | cBridge |-------------------------->| cTrees |<------------->| cNode |
        ^
        |
    | cMain |<----->| cPageLinks |<------| cBookmarks |
```
