import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';

@Pipe({
  name: 'yearComparision',
  pure: false
})
export class YearComparisionPipe implements PipeTransform {


  transform(value: FormArray, index: number): any {
    const a = value.controls[index]?.value?.value;
    const b = value.controls[index - 1]?.value?.value;
    
    if(!a || !b) return false;
    return +a < +b;
  }

}
