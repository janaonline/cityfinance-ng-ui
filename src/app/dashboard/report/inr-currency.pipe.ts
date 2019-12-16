import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "inrCurrency"
})
export class InrCurrencyPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    const valueToOperatte = value;
    if (!valueToOperatte) {
      return valueToOperatte;
    }

    const absoluteValue =
      valueToOperatte < 0
        ? Math.round(valueToOperatte * -1)
        : Math.round(valueToOperatte);

    let numberInString = absoluteValue + "";
    if (Math.round(absoluteValue / 1000)) {
      /*
      * IMPORTANT Do not change this to Math.round. That will mess with the value.
        Original VAlue = 123656.
        absoluteValue = 123656.
        newNumber(with Math.round) = Math.round(123656/1000) = 124; this is wrong.
        newNumber(with Math.round) = parseIntd(123656/1000) = 123;  this is correct.

     */

      const newNumber = parseInt((absoluteValue / 1000) as any);
      const stringNumber = (newNumber + "").replace(
        /(\..*)$|(\d)(?=(\d{2})+(?!\d))/g,
        (digit, fract) => fract || digit + ","
      );

      numberInString = newNumber
        ? stringNumber +
          "," +
          numberInString.substring(numberInString.length - 3)
        : numberInString.substring(numberInString.length - 3);
    }

    if (valueToOperatte < 0) {
      return `(${numberInString})`;
    }
    return numberInString;
  }
}
