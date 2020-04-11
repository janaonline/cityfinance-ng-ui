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
}
