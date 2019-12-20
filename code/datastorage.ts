class cDataStorage {
  constructor() {}

  public static hasLocalStorage(): boolean {
    return window.localStorage ? true : false;
  }

  public static addJsonToStorage<T extends Object>(key: string, obj: T) {
    if (!cDataStorage.hasLocalStorage() || !obj) return;

    window.localStorage.setItem(key, JSON.stringify(obj));

    cDataStorage.addKey(key);
  }

  public static getJsonFromStorage(key: string): Object {
    if (!cDataStorage.hasLocalStorage() || key === "") return {};

    return JSON.parse(window.localStorage.getItem(key) || "");
  }

  public static addKey(key: string) {
    if (!cDataStorage.hasLocalStorage()) return;

    let aryKeys: string[] = JSON.parse(
      window.localStorage.getItem("key") || "[]"
    );

    // If key already exists then return
    if (aryKeys.includes(key)) return;

    (!aryKeys && (aryKeys = []) && aryKeys.push(key)) || aryKeys.push(key);

    window.localStorage.setItem("key", JSON.stringify(aryKeys));
  }
}

export { cDataStorage };
