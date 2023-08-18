import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gtcCustomErrors',
  pure: true
})
export class GtcCustomErrorsPipe implements PipeTransform {

  transform(shortKey: string, parent: any, questionData: any, loopIndex: number): unknown {
    if (shortKey == 'totalElectedMpc') {
      const totalElectedMpc = questionData.find(question => question.shortKey == "statedetails")?.childQuestionData?.[0]
        ?.find(question => question.shortKey == 'totalElectedMpc')?.modelValue;
      const totalMpc = questionData.find(question => question.shortKey == "statedetails")?.childQuestionData?.[0]
        ?.find(question => question.shortKey == 'totalMpc')?.modelValue;

      if(+totalElectedMpc > +totalMpc) {
        return 'Total Elected MPCs should be less than equal to Total MPCs'
      }
    }

    if (shortKey == 'totalElectedNmpc') {
      const totalElectedNmpc = questionData.find(question => question.shortKey == "statedetails")?.childQuestionData?.[0]
        ?.find(question => question.shortKey == 'totalElectedNmpc')?.modelValue;
      const totalNmpc = questionData.find(question => question.shortKey == "statedetails")?.childQuestionData?.[0]
        ?.find(question => question.shortKey == 'totalNmpc')?.modelValue;

      if(+totalElectedNmpc > +totalNmpc) {
        return 'Total Elected NMPCs should be less than equal to Total NMPCs'
      }
    }

    if (shortKey === 'transferGrantdetail_tableview_addbutton') {
      const recAmount = questionData.find(question => question.shortKey == "recgrandtetail")?.childQuestionData?.[0]
        ?.find(question => question.shortKey == 'recAmount')?.modelValue;

      const transferGrantdetail = questionData.find(question => question.shortKey == 'transferGrantdetail_tableview_addbutton');
      const totalTransAmount = this.getRowSum(transferGrantdetail?.childQuestionData, 0);
      console.log('project details', recAmount, totalTransAmount)
      if (recAmount != totalTransAmount) {
        return 'Amount transferred should be equal to amount received.';
      }
    }

    return;
  }


  getRowSum(rows, index) {
    return rows.reduce((sum, row) => sum + (+row?.[index]?.modelValue || 0), 0)
  }

}
