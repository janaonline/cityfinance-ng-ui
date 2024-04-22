import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.replace('.', '_');
  }

}
