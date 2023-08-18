import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableView'
})
export class TableViewPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.toLowerCase().includes('_tableview');
  }

}
