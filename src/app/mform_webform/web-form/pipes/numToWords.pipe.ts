import { Pipe, PipeTransform } from '@angular/core';
import { ToWords } from 'to-words';

const hiddenKeys = [
  'cost',
  'expenditure',
  'percProjectCost',
  'waterSupply_actualIndicator',
  'waterSupply_targetIndicator',
  'sanitation_actualIndicator',
  'sanitation_targetIndicator',
  'solidWaste_actualIndicator',
  'solidWaste_targetIndicator',
  'stormWater_actualIndicator',
  'stormWater_targetIndicator'
];

@Pipe({
  name: 'toWord'
})
export class ToWordPipe implements PipeTransform {
  transform(value: number, shortKey: string, form: string): unknown {
    // console.log(value);
    if (hiddenKeys.includes(shortKey)) return '';
    if (!value || !isFinite(value)) return '';
    const words = new ToWords({
      localeCode: 'en-IN',

    }).convert(Number(value), {
      currency: false,
      doNotAddOnly: true,
    });

    if (
      (
        (form == 'dur' && !['percProjectCost', 'wm_numberOfProjects', 'sw_numberOfProjects'].includes(shortKey)) ||
        (form == 'gtc' && ['recAmount', 'transAmount', 'intTransfer'].includes(shortKey))
      ) &&
      value != 0
    ) {
      return words + (value == 1 ? ' lakh' : ' lakhs');
    }
    return words;
  }
}
