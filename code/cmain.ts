import { cBridge } from "./cbridge";
import { iBridge } from "./interface/ibridge";
import { cCards } from "./ccards";
import { cPageLinks } from "./cpageLinks";


class cMain {
    private _aryGuiComponents: Array<iBridge>;

    private _cBrigde: cBridge;
    private _cPageLinks: cPageLinks;

    constructor() {
        this._aryGuiComponents   = [new cCards()];
        this._cBrigde            = new cBridge(this._aryGuiComponents[this._aryGuiComponents.length - 1]);
        this._cPageLinks         = new cPageLinks();
    }

    public main(): void {
        (async () => {
            this._cBrigde.populate(await this._cPageLinks.getPageLinkItems());
            this._cBrigde.guiSettings(null);
            this._cBrigde.render();
        })();
    }
}

new cMain().main();