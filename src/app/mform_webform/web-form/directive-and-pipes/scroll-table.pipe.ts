import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scrollTable',
  pure: false,
})
export class ScrollTablePipe implements PipeTransform {

  transform(questions: any[], startIndex = 0, maxCount = 10): unknown {
    return questions.slice(startIndex, Math.round(startIndex) + maxCount);
  }

}
