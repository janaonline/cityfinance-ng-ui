import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableRowCalculator',
})
export class TableRowCalculatorPipe implements PipeTransform {

  transform(value: string, key: string, data: any[]): unknown {
    console.log(data);
    if(value == '$sum') return data.reduce((total, item) =>  total + item?.[key], 0);
    return value;
  }
}
