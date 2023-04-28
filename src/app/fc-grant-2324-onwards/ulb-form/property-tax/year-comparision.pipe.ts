import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearComparision'
})
export class YearComparisionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return false;
  }

}
