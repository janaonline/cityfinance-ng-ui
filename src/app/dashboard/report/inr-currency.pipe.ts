import { Pipe, PipeTransform } from '@angular/core';

import { ICurrencryConversion } from './basic/conversionTypes';

@Pipe({
  name: "inrCurrency"
})
export class InrCurrencyPipe implements PipeTransform {
  transform(
    value: number,
    options?: { currencyTypeInUser: ICurrencryConversion["type"] }
  ): any {
    const valueToOperatte = value;
    if (!valueToOperatte) {
      return valueToOperatte;
    }

    /**
     * @description We need to show negative number as postive within (),
     * thats why we are converting it to positive.
     */
    let absoluteValue =
      valueToOperatte < 0
        ? Math.round(valueToOperatte * -1)
        : Math.round(valueToOperatte);

    if (options && options.currencyTypeInUser) {
      absoluteValue = this.getConvertedAmount(
        absoluteValue,
        options.currencyTypeInUser
      );
    }
    let numberInString = absoluteValue + "";
    if (Math.round(absoluteValue / 1000)) {
      numberInString = this.formatNumber(absoluteValue);
    }

    if (valueToOperatte < 0) {
      return `(${numberInString})`;
    }
    return numberInString;
  }

  private formatNumber(absoluteValue: number) {
    const numberInString = absoluteValue + "";
    /*
      * IMPORTANT Do not change this to Math.round. That will mess with the value.
        Original VAlue = 123656.
        absoluteValue = 123656.
        newNumber(with Math.round) = Math.round(123656/1000) = 124; this is wrong.
        newNumber(with parseInt) = parseInt(123656/1000) = 123;  this is correct.

     */
    const newNumber = parseInt(absoluteValue / 1000 + "", 10);
    const stringNumber = (newNumber + "").replace(
      /(\..*)$|(\d)(?=(\d{2})+(?!\d))/g,
      (digit, fract) => fract || digit + ","
    );

    return newNumber
      ? stringNumber + "," + numberInString.substring(numberInString.length - 3)
      : numberInString.substring(numberInString.length - 3);
  }

  private getConvertedAmount(
    numberToConvert: number,
    option: ICurrencryConversion["type"]
  ) {
    return parseInt(numberToConvert / option + "", 10);
  }
}
