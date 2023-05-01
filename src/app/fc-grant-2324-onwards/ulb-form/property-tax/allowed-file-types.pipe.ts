import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'allowedFileTypes'
})
export class AllowedFileTypesPipe implements PipeTransform {

  transform(types: string[], ...args: unknown[]): unknown {
    return types?.map(type => '.' + type)?.join(',');
  }

}
