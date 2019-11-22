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
      }
      callback(obj[key], key, index, obj);
    });
  }

  public static getElmsByTagName(id: string): HTMLCollectionOf<Element> {
    return document.getElementsByTagName(id);
  }

  public static getElmById(id: string): HTMLElement | null {
    return document.getElementById(id);
  }
}

export { Utils };
