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

  /**
   * @description Convert values in the given format
   * to 2 decimal places.
   *
   * @example
   * input = 33, output = '33.00'
   * input = 33.1, output = '33.10'
   * input = 33.126, output = '33.13'
   *
   * input = {'myKey': 34.3}, output = {'myKey': '34.30'},
   * input = {'myKey': [34.3, 2]}, output = {'myKey': ['34.30', '2.00']},
   * input = {'myKey': {'subKey': 34.3}}, output = {'myKey': {'subKey': '34.30'}},
   *
   * input = [2], output = ['2.00'],
   * input = [{'myKey': 23}], output = [{'myKey': '23.00'}],
   */
  public convert(input: any) {
    if (!input) return;
    if (typeof input === "number") {
      return Number(`${input}`).toFixed(2);
    }

    if (typeof input === "string") {
      if (Number.isNaN(Number(`${input}`))) return input;
      return Number(`${input}`).toFixed(2);
    }

    if (Array.isArray(input)) {
      return this.convertArrayValuesToDecimalValues(input);
    }

    return this.convertObjectValuesToDecimalValues(input);
  }

  private convertObjectValuesToDecimalValues(inputObj: { [key: string]: any }) {
    if (!inputObj) return;
    Object.keys(inputObj).forEach((key) => {
      if (
        typeof inputObj[key] === "number" ||
        typeof inputObj[key] === "string"
      ) {
        inputObj[key] = this.convert(inputObj[key]);
      } else if (Array.isArray(inputObj[key])) {
        inputObj[key] = this.convertArrayValuesToDecimalValues(inputObj[key]);
      } else if (typeof inputObj[key] === "object") {
        inputObj[key] = this.convertObjectValuesToDecimalValues(inputObj[key]);
      }
    });
    return inputObj;
  }

  private convertArrayValuesToDecimalValues(inputArray: any[]) {
    return inputArray.map((value) => {
      if (typeof value === "number") return this.convert(value);
      if (Array.isArray(value)) {
        return this.convertArrayValuesToDecimalValues(value);
      }

      return this.convertObjectValuesToDecimalValues(value);
    });
  }
}
