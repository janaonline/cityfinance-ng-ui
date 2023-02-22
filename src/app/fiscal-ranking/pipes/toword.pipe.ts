import { Pipe, PipeTransform } from '@angular/core';
import { ToWords } from 'to-words';

@Pipe({
  name: 'toword'
})
export class TowordPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    if(!value) return '';
    return new ToWords().convert(Number(value), {
      currency: false,
      doNotAddOnly: true,
    });
  }
}
