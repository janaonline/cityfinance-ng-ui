import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "inrCurrency"
})
export class InrCurrencyPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) {
      return "";
    }
    let x = value < 0 ? `(${(value * -1).toString()})` : value.toString();
    let decimal = "";

    if (x.indexOf(".") > -1) {
      decimal = x.substring(x.indexOf("."));
      x = x.substring(0, x.indexOf("."));
    }
    // x = x.substring(0, x.indexOf('.'));
    let lastThree = x.substring(x.length - 3);
    const otherNumbers = x.substring(0, x.length - 3);

    if (otherNumbers != "") {
      lastThree = "," + lastThree;
    }
    return (
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + decimal
    );

    // return value;
  }
}
