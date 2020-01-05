import { iBridge } from "./interface/ibridge";
import { iPageLinkItems } from "./interface/ipagelink";


class cBridge implements iBridge {
    private _currentBridge: iBridge;

    constructor(brigde: any) {
        this._currentBridge = brigde;
    }

    public render(): boolean {
        if (!this._currentBridge) return false;        

        return this._currentBridge.render();
    }

    public populate(iPageLinkItems: iPageLinkItems): void {
        if (!this._currentBridge) return;

        this._currentBridge.populate(iPageLinkItems);
    }

    public guiSettings<T>(settings: T | null) {
        if (!this._currentBridge) return;

        this._currentBridge.guiSettings(settings);
    }

}

export { cBridge };