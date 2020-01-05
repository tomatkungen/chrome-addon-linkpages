class Utils {
    constructor() {}

    public static isObject<T extends object>(obj: T): boolean {
        return typeof obj === "object";
    }

    public static convertIntToStylePixel(value: number): string {
        return value + "px";
    }

    public static loopOjbWithCallback<T extends { [key: string]: any }>(
        obj: T,
        callback: (value: any, key: string, index?: number, obj?: T) => void
    ) {
        if (!Utils.isObject(obj)) return;

        Object.keys(obj).forEach((key: string, index: number) => {
            if (callback && key && obj[key]) {
                callback(obj[key], key, index, obj);
            }
        });
    }

    public static getElmsByTagName(id: string): HTMLCollectionOf<Element> {
        return document.getElementsByTagName(id);
    }

    public static getElmById(id: string): HTMLElement | null {
        return document.getElementById(id);
    }

    public static compareObjects<T extends object, U extends Object>(firstObj: T, secondObj: U): boolean {
        return JSON.stringify(firstObj) === JSON.stringify(secondObj);
    }

    public static isNotNumber(anyValue: any): boolean {
        return window.isNaN(anyValue);
    }

    public static approximateDomain(url: string = "http://localhost"): string {
        const urlDomain = new URL(url);

        return urlDomain.hostname.split('.').map((name: string, index, array) => {
            if (
                name === 'www' ||
                (
                    index > 0 &&
                    index === (array.length - 1) &&
                    Utils.isNotNumber(name)
                )
            ) return '';

            return name;
        }).join(' ').trim() + (urlDomain.port === '' ? '' : ' : ' + urlDomain.port);


    }
}

export { Utils };
