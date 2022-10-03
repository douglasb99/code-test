import { anErr, anOk, isOk, Result } from "../results";

/**
 *  ALL keys for storage put in this enum to prevent conflicts
 */
export enum STORAGE_KEYS {
  CERTIFICATES = "CERTIFICATES",
}

export default class LocalStorage {
  private static save(key: STORAGE_KEYS, value: string): Result<true> {
    try {
      localStorage.setItem(key, value);
    } catch (err: any) {
      anErr(err.message);
    }
    return anOk(true);
  }

  /**
   *  To use to save to local storage value is an array; to push into the array rather than overwrite
   */
  public static async append(
    key: STORAGE_KEYS,
    value: string
  ): Promise<Result<true>> {
    const existing = await LocalStorage.load(key);

    let updated = [];

    if (isOk(existing)) {
      updated = JSON.parse(existing.value);
    }

    updated.push(JSON.parse(value));
    return LocalStorage.save(key, JSON.stringify(updated));
  }

  /**
   * Load  state from localstorage by Key
   *
   * @returns {undefined | MyReduxState } our serialized redux state
   */
  public static load(key: STORAGE_KEYS): Result<string> {
    try {
      const serializedState = localStorage.getItem(key);
      if (serializedState === null) {
        return anErr("failed to read key");
      }

      return anOk(serializedState);
    } catch (err) {
      return anErr("");
    }
  }
}
