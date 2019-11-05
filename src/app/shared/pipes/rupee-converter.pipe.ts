import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupeeConverter'
})
export class RupeeConverterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
