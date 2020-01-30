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

    numberInString = this.formatNumber(absoluteValue);
    if (valueToOperatte < 0) {
      return `(${numberInString})`;
    }
    return numberInString;
  }

  private formatNumber(absoluteValue: number) {
    const numbersWithin3Digits = absoluteValue + "";
    /*
      * IMPORTANT Do not change this to Math.round. That will mess with the value.
        Original VAlue = 123656.
        absoluteValue = 123656.
        newNumber(with Math.round) = Math.round(123656/1000) = 124; this is wrong.
        newNumber(with parseInt) = parseInt(123656/1000) = 123;  this is correct.

     */
    const newNumber = parseInt(absoluteValue / 1000 + "", 10);
    const numberAfter3Digit = (newNumber + "").replace(
      /(\..*)$|(\d)(?=(\d{2})+(?!\d))/g,
      (digit, fract) => fract || digit + ","
    );

    const indexOfDecimal = numbersWithin3Digits.indexOf(".");

    // console.log(
    //   `numbersWithin3Digits`,
    //   numbersWithin3Digits,
    //   numbersWithin3Digits.substring(indexOfDecimal - 3, indexOfDecimal + 3)
    // );
    if (indexOfDecimal === -1) {
      return newNumber
        ? numberAfter3Digit +
            "," +
            numbersWithin3Digits.substring(numbersWithin3Digits.length - 3)
        : numbersWithin3Digits.substring(numbersWithin3Digits.length - 3);
    }

    /**
     * You may wonder why we are doing indexOfDecimal + 2. It is so becasue we need to
     * show the values only upto 2 decimal places. If in future we need to set the decimal
     * values dynamically, then pass the decimal places within option object parameter
     * and use that here.
     */
    return newNumber
      ? numberAfter3Digit +
          "," +
          numbersWithin3Digits.substring(indexOfDecimal - 3, indexOfDecimal + 3)
      : numbersWithin3Digits.substring(indexOfDecimal - 3, indexOfDecimal + 3);
  }

  private getConvertedAmount(
    numberToConvert: number,
    option: ICurrencryConversion["type"]
  ) {
    return numberToConvert / option;
  }
}
