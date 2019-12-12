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

    const newVAlue =
      valueToOperatte < 0
        ? Math.round(valueToOperatte * -1)
        : Math.round(valueToOperatte);

    let numberInString = newVAlue + "";
    if (Math.round(newVAlue / 1000)) {
      const newNumber = Math.round(newVAlue / 1000);
      const stringNumber = (newNumber + "").replace(
        /(\..*)$|(\d)(?=(\d{2})+(?!\d))/g,
        (digit, fract) => fract || digit + ","
      );
      numberInString =
        stringNumber +
        "," +
        numberInString.substring(numberInString.length - 3);
    }
    if (valueToOperatte < 0) {
      return `(${numberInString})`;
    }
    return numberInString;
  }
}
