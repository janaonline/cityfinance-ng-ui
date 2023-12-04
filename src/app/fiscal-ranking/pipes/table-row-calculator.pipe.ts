import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableRowCalculator',
})
export class TableRowCalculatorPipe implements PipeTransform {

  transform(value: string, key: string, data: any[], excludeFirstItem:boolean): unknown {
    console.log(data);
    if(excludeFirstItem) data = data.slice(1);
    // if(value == '$sum') return data.reduce((total, item) =>  total + item?.[key], 0);
    if (value === '$sum') {
      const sum = data.reduce((total, item) => total + (item?.[key] || 0), 0);
      return parseFloat(sum.toFixed(2));
    }
    return value;
  }
}
