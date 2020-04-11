export class JSONUtility {
  /**
   *
   * @description It does not support the flattening of array of json;
   */
  public convertToFlatJSON(original: {}) {
    let newJSON = {};
    Object.keys(original).forEach(key => {
      if (typeof original[key] === "object") {
        const nestedValue = this.convertToFlatJSON(original[key]);
        newJSON = { ...newJSON, ...nestedValue };
        return;
      }
      newJSON[key] = original[key];
    });
    return newJSON;
  }

  public filterEmptyValue(obj: any) {
    if (!obj) {
      return null;
    }
    const value = {};
    Object.keys(obj).forEach(key => {
      if (obj[key] === null || obj[key] === undefined) {
        return;
      }
      if (typeof obj[key] === "string" && !obj[key].trim()) {
        return;
      }
      value[key] = obj[key];
    });

    return Object.keys(value).length ? value : null;
  }
}
