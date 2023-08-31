import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includes'
})
export class IncludesPipe implements PipeTransform {

  transform(input: Array<any>, searchElement: any): boolean {
    return input?.includes(searchElement);
  }

}
