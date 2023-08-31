import { Pipe, PipeTransform } from '@angular/core';

const oppositeComparisionKeys = [
  '6284d6f65da0fa64b423b516',
  '6284d6f65da0fa64b423b540'
];

@Pipe({
  name: 'slb28CustomErrors'
})
export class Slb28CustomErrorsPipe implements PipeTransform {

  transform(shortKey: string, parent: any, questionData: any, loopIndex: number, minRange: number): unknown {
    if (minRange != undefined) {
      const minRangeActualValue = parent?.childQuestionData[loopIndex]
        ?.find(col => col.shortKey == shortKey)?.modelValue;
      if (minRangeActualValue != '' && minRangeActualValue < minRange) {
        return 'Minimum range is ' + minRange;
      }
    }
    // if (shortKey.endsWith('_actualIndicator') || shortKey.endsWith('_targetIndicator')) {
    //   const actualValue = parent?.childQuestionData[loopIndex]
    //     ?.find(col => col.shortKey.endsWith('_actualIndicator'))?.modelValue;
    //   const targetValue = parent?.childQuestionData[loopIndex]
    //     ?.find(col => col.shortKey.endsWith('_targetIndicator'))?.modelValue;
    //   const lineItemValue = parent?.childQuestionData[loopIndex]
    //     ?.find(col => col.shortKey.endsWith('_indicatorLineItem'))?.modelValue;

    //   if (!actualValue || !targetValue) return false;

    //   if (oppositeComparisionKeys.includes(lineItemValue)) {

    //     if (+actualValue < +targetValue) {
    //       return shortKey.includes('_actualIndicator')
    //         ? 'Actual 2022-23 should be greater than Target 2023-24'
    //         : 'Target 2023-24 should be less than Actual 2022-23';
    //     }
    //   } else {
    //     if (+actualValue > +targetValue) {
    //       return shortKey.includes('_actualIndicator')
    //         ? 'Actual 2022-23 should be less than Target 2023-24'
    //         : 'Target 2023-24 should be greater than Actual 2022-23';
    //     }
    //   }
    // }
  }
}
