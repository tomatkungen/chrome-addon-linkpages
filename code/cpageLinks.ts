import { iPageLinkItems } from "./interface/ipagelink";

class cPageLinks {
    constructor() {
    }

    public getPageLinkItems(): iPageLinkItems {
        return [
            {
                id: 1,
                title: "Conflunce",
                subTitle: "Latest Wiki updates - Linköping",
                link: "http://www.google.se"
            },
            {
                id: 2,
                title: "Conflunce",
                subTitle: "Latest Wiki updates - Linköping",
                link: "http://www.google.se"
            }
        ];
    }
}

export { cPageLinks };