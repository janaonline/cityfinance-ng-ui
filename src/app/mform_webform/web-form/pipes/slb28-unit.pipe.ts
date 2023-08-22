import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slb28Unit'
})
export class Slb28UnitPipe implements PipeTransform {

  transform(shortKey: string, parent: any, loopIndex: number): unknown {
    if(!(shortKey.endsWith('_actualIndicator') || shortKey.endsWith('_targetIndicator'))) return false;
    const unit = parent?.childQuestionData?.[loopIndex].find(question => question?.shortKey?.endsWith('_unit'))?.modelValue;
    return unit;
  }

}
