import { Pipe, PipeTransform } from '@angular/core';
import { TableRowCalculatorPipe } from './table-row-calculator.pipe';

@Pipe({
  name: 'durCustomErrors',
  pure: true
})
export class DurCustomErrorsPipe implements PipeTransform {


  transform(shortKey: string, parent: any, questionData: any, loopIndex: number): unknown {
    if (shortKey == 'cost') {
      const cost = questionData.find(question => question.shortKey == "projectDetails_tableView_addButton")
        ?.childQuestionData?.[loopIndex]
        ?.find(question => question.shortKey == 'cost')?.modelValue
      if (cost == 0) {
        return 'Total Project Cost should be greater then 0 ' + cost;
      }
    }
    if (shortKey === 'grantPosition___expDuringYr') {
      const expDuringYr = questionData.find(question => question.shortKey == "grantPosition")?.childQuestionData?.[0]
        ?.find(question => question.shortKey == shortKey)?.modelValue;
      const waterManagement = questionData.find(question => question.shortKey == 'waterManagement_tableView');
      const solidWasteManagement = questionData.find(question => question.shortKey == 'solidWasteManagement_tableView');
      const wmSum = this.getRowSum(waterManagement?.childQuestionData, 1);
      const swmSum = this.getRowSum(solidWasteManagement?.childQuestionData, 1);
      if (wmSum + swmSum != expDuringYr) {
        return 'The total expenditure in the component wise grants must not exceed the amount of expenditure incurred during the year.'
      }
    }

    if (shortKey === 'grantPosition___closingBal') {
      const closingBal = questionData.find(question => question.shortKey == "grantPosition")?.childQuestionData?.[0]
        ?.find(question => question.shortKey == shortKey)?.modelValue;
      if (parseInt(closingBal) < 0)
        return 'Closing balance is negative because Expenditure amount is greater than total tied grants amount available. Please recheck the amounts entered.'
    }

    if (shortKey === 'projectDetails_tableView_addButton') {
      const expDuringYr = questionData.find(question => question.shortKey == "grantPosition")?.childQuestionData?.[0]
        ?.find(question => question.shortKey == 'grantPosition___expDuringYr')?.modelValue;

      const projectDetails = questionData.find(question => question.shortKey == 'projectDetails_tableView_addButton');
      const projectSum = this.getRowSum(projectDetails?.childQuestionData, 6);
      console.log('project details', expDuringYr, projectSum)
      if (expDuringYr != projectSum) {
        return 'Sum of all project wise expenditure amount does not match total expenditure amount provided in the XVFC summary section. Kindly recheck the amounts.';
      }
    }

    if (shortKey.endsWith('_totalProjectCost')) {
      const error = this.getProjectCostErrors(shortKey, parent, questionData, loopIndex);
      if (error) return error;
    }
    if (shortKey == 'expenditure') {
      const error = this.get15FCProjectCostErrors(shortKey, parent, questionData, loopIndex);
      if (error) return error;
    }

    return;
  }

  getProjectCostErrors(shortKey: string, parent: any, questionData: any, loopIndex: number) {
    const totalProjectCost = parent?.childQuestionData[loopIndex]
      ?.find(col => col.shortKey.endsWith('_totalProjectCost'))?.modelValue;
    const grantUtilised = parent?.childQuestionData[loopIndex]
      ?.find(col => col.shortKey.endsWith('_grantUtilised'))?.modelValue;

    if (!totalProjectCost || !grantUtilised) return false;

    if (+totalProjectCost < +grantUtilised) {
      return 'Project Cost cannot be lower than Tied grants. Please recheck the amounts.';
    }
  }


  get15FCProjectCostErrors(shortKey: string, parent: any, questionData: any, loopIndex: number) {
    const expenditure = parent?.childQuestionData[loopIndex]
      ?.find(col => col.shortKey == 'expenditure')?.modelValue;
    const cost = parent?.childQuestionData[loopIndex]
      ?.find(col => col.shortKey == 'cost')?.modelValue;

    if (!expenditure || !cost) return false;

    if (+expenditure > +cost) {
      return 'Amount of 15th FC grants in total project cost should be less than or equal to the total project cost.';
    }
  }

  getRowSum(rows, index) {
    return rows.reduce((sum, row) => sum + (+row?.[index]?.modelValue || 0), 0)
  }
}
