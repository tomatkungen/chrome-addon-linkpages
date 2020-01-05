import { Utils } from "../sutils";
import { iSettings } from "../interface/isetting";
import { iPageLinkItems } from "../interface/ipagelink";

abstract class aLayout {
    
    // Settings for Layout
    private _settings: iSettings;
    
    // Element Container
    private _elmContainer: HTMLElement | null;

    // Element Container Id
    private _elmContainerId: string = 'container';

    // Contains the links
    private _pageLinkItems: iPageLinkItems;

    constructor () {
        this._settings = {
            winHeight: window.innerHeight,  // Window Height
            winWidth: window.innerWidth     // Window Width
        };
        this._elmContainer = Utils.getElmById(this._elmContainerId);
        this._pageLinkItems = [];
    }

    set settings(settings: iSettings) {
        Object.assign(this._settings, settings);
    }

    get settings(): iSettings {
        return this._settings;
    }

    get container(): HTMLElement | null {
        return this._elmContainer;
    }

    set pageLinkItems(pageLinkItems: iPageLinkItems) {
        this._pageLinkItems = pageLinkItems;
    }

    get pageLinkItems(): iPageLinkItems {
        return this._pageLinkItems;
    }

    public hasPageLinkItems(): boolean {
        return !!(this._pageLinkItems && this._pageLinkItems.length);
    }

    public hasContainer(): boolean {
        return (!!this._elmContainer);
    }

    public extend<First, Second>(first: First, second: Second): First & Second {
        const result: Partial<First & Second> = {};
        for (const prop in first) {
            if (first[prop]) {
                (result as First)[prop] = first[prop];
            }
        }
        for (const prop in second) {
            if (second[prop]) {
                (result as Second)[prop] = second[prop];
            }
        }
        return result as First & Second;
    }
}

export { aLayout };