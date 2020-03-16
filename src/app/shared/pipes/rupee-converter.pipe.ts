import {Pipe, PipeTransform} from '@angular/core';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Pipe({
  name: 'rupeeConverter'
})
export class RupeeConverterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args && args.colId) {
      if (args.colId === 'numOfUlb') {
        if ('audited' in args.row){
          return `Audited : ${args.row.audited},\t\n
                Unaudited : ${args.row.unaudited
          }`;
        }
        return ;
      }
    }

    let newValue = value;
    if (typeof value == 'object') {
      value = value.value;
      newValue = value.value;
    }
    if (typeof value === 'string') {
      if (value.includes('%')) {
        newValue = Number(value.replace('%', ''));
      } else {
        if (isNaN(Number(value))) {
          return value;
        }
      }
    }
    if (!value) {
      return value;
    }
    let x = newValue.toString();
    let afterPoint = '';
    if (x.indexOf('.') > 0) {
      afterPoint = x.substring(x.indexOf('.'), x.length);
    }
    x = Math.floor(x);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var othervaluebers = x.substring(0, x.length - 3);
    if (othervaluebers != '') {
      lastThree = ',' + lastThree;
    }
    let finalString = othervaluebers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;

    if (value && value.toString().includes('%')) {
      finalString = finalString + '%';
    }
    if (args && args.showInr) {
      // if (typeof value === 'number' || !isNaN(value)) {
      return `INR ${finalString}`;
      //}
    }
    return finalString;
  }
}
