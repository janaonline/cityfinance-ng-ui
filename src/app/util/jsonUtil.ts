export class JSONUtility {
  /**
   *
   * @description It does not support the flattening of array of json;
   * @example
   *  const original = {'a': {'b': 3}};
   *  const newObject = convertToFlatJSON(original); // {'b': 3}
   *
   *  const original = {'a': {'b': {'c': {'d': 3}, 'e': 45}}};
   *  const newObject = convertToFlatJSON(original); // {'d': 3, 'e': 45}
   */
  public convertToFlatJSON(original: {}) {
    let newJSON = {};
    Object.keys(original).forEach((key) => {
      if (typeof original[key] === "object") {
        const nestedValue = this.convertToFlatJSON(original[key]);
        newJSON = { ...newJSON, ...nestedValue };
        return;
      }
      newJSON[key] = original[key];
    });
    return newJSON;
  }

  /**
   * @description A Pure Function that removes entries of empty / null / undefiend values.
   * @example
   * const original = { a: 34, b: null, c: undefined, d: '' };
   * filterEmptyValue(original) // return { a: 34}
   */
  public filterEmptyValue(obj: any) {
    if (!obj) {
      return null;
    }
    const value = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null || obj[key] === undefined) {
        return;
      }
      if (typeof obj[key] === "string" && !obj[key].trim()) {
        return;
      }
      if (typeof obj[key] === "string") {
        value[key] = obj[key].trim();
      } else {
        value[key] = obj[key];
      }
    });

    return Object.keys(value).length ? value : null;
  }
}
