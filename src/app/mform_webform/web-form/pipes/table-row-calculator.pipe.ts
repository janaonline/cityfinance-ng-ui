import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableRowCalculator',
})
export class TableRowCalculatorPipe implements PipeTransform {

  transform(value: string, rows: any[], index: number): unknown {
    if(value == '$sum') return rows.reduce((sum, row) => row?.[index]?.visibility ? (sum + (+row?.[index]?.modelValue || 0)) : 0, 0).toFixed(2);
    return value;
  }
}
