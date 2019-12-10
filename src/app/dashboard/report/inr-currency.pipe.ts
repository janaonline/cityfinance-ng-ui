import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "inrCurrency"
})
export class InrCurrencyPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    if (!value) {
      return value;
    }

    let x =
      value < 0 ? `(${Math.round(value * -1)})` : Math.round(value).toString();
    let decimal = "";

    if (x.indexOf(".") > -1) {
      decimal = x.substring(x.indexOf("."));
      x = x.substring(0, x.indexOf("."));
    }
    // x = x.substring(0, x.indexOf('.'));
    let lastThree, otherNumbers;
    if (value < 0) {
      lastThree = x.substring(x.length - 5);
      otherNumbers = x.substring(0, x.length - 5);
    } else {
      lastThree = x.substring(x.length - 3);
      otherNumbers = x.substring(0, x.length - 3);
    }

    if (otherNumbers != "") {
      lastThree = "," + lastThree;
    }
    const finalNumber =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + decimal;
    return finalNumber;

    // return value;
  }
}
