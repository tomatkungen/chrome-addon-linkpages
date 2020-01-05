import { iPageLinkItems } from "./ipagelink";

interface iBridge {
    populate(cPageLinkItems : iPageLinkItems)   : void;     // Populates with pageItems
    guiSettings<T>(settings: T | null)          : void;     // GUI Settings
    render()                                    : boolean;  // Render the templates
}

export { iBridge };