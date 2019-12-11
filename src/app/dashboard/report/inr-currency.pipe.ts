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

    const x =
      valueToOperatte < 0
        ? `(${Math.round(valueToOperatte * -1)})`
        : Math.round(valueToOperatte).toString();
    const decimal = "";

    const newVAlue =
      valueToOperatte < 0
        ? Math.round(valueToOperatte * -1)
        : Math.round(valueToOperatte);

    // if (x.indexOf(".") > -1) {
    //   decimal = x.substring(x.indexOf("."));
    //   x = x.substring(0, x.indexOf("."));
    // }
    // x = x.substring(0, x.indexOf('.'));
    let numberInString = newVAlue + "";
    if (Math.round(newVAlue / 1000)) {
      const newNumber = Math.round(newVAlue / 1000);
      const stringNumber = (newNumber + "").replace(
        /(\..*)$|(\d)(?=(\d{2})+(?!\d))/g,
        (digit, fract) => fract || digit + ","
      );
      numberInString = stringNumber + "," + (newVAlue % 1000);
    }
    if (valueToOperatte < 0) {
      return `(${numberInString})`;
    }
    return numberInString;

    // if (valueToOperatte < 0) {
    //   lastThree = x.substring(x.length - 4);
    //   otherNumbers = x.substring(0, x.length - 4);
    // } else {
    //   lastThree = x.substring(x.length - 4);
    //   otherNumbers = x.substring(0, x.length - 3);
    // }

    // if (valueToOperatte < -7100 && valueToOperatte > -7300) {
    //   console.log(x, lastThree, otherNumbers);
    // }

    // if (otherNumbers != "") {
    //   lastThree = "," + lastThree;
    // }
    // const finalNumber =
    //   otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + decimal;
    // return finalNumber;

    // return value;
  }
}
