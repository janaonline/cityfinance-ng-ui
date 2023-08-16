import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'endsWith'
})
export class EndsWithPipe implements PipeTransform {
  transform(str: string, endsWithStrings: string[] = []): boolean {
    return endsWithStrings.some(endsWithString => str?.endsWith(endsWithString));
  }
}
