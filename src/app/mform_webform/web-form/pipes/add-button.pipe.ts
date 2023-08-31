import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addButton'
})
export class AddButtonPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return (value || '').toLowerCase().includes('_addbutton');
  }

}
