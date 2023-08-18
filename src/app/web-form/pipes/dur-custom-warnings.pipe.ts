import { Pipe, PipeTransform } from '@angular/core';

const reasonalbleLimitsKeys = [
  'grantPosition___receivedDuringYr',
  'grantPosition___expDuringYr',
  'wm_grantUtilised',
  'wm_totalProjectCost',
  'sw_grantUtilised',
  'sw_totalProjectCost',
  'cost',
  'expenditure',
];

const inReasonalbeLimit = (value) => {
  value = parseInt(value);
  if (isNaN(value) || (value >= 50 && value <= 1000)) return true;
  return false;
}

@Pipe({
  name: 'durCustomWarnings'
})
export class DurCustomWarningsPipe implements PipeTransform {

  transform(shortKey: string, question: any, questionData: any, loopIndex: number): unknown {
    if (shortKey == 'completionDate') {
      const startDateStr = questionData.find(question => question.shortKey == "projectDetails_tableView_addButton")
        ?.childQuestionData[loopIndex]
        ?.find(question => question.shortKey == 'startDate')?.modelValue;
      const completionDateStr = question.modelValue;

      const startDate = new Date(startDateStr);
      const completionDate = new Date(completionDateStr);

      const timeDiff = completionDate.getTime() - startDate.getTime(); // in milliseconds
      const diffInMonths = timeDiff / (1000 * 60 * 60 * 24 * 30); // assuming 30 days per month

      if (diffInMonths < 6) {
        return 'Please note the project duration is less than 6 months';
      }
    }
    if (reasonalbleLimitsKeys.includes(shortKey) && !inReasonalbeLimit(question.modelValue))
      return `${question.modelValue} is outside reasonable limit, are you sure you want to proceed?`;
  }


}
