import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Pipe({
  name: 'percentprogress',
  pure: false
})
export class PercentprogressPipe implements PipeTransform {
  transform(value: FormArray, index: number, type: 'class' | 'text'): any {
    const a = value.controls[index].value?.value;
    const b = value.controls[index - 1].value?.value;
    
    if(!a || !b) return null;
    console.log({ a, b });
    const percent = Math.floor((a - b) / b * 100);
    if(type == 'class') return percent > 0 ? 'text-success' : 'text-danger'
    return `Amount ${Math.abs(percent)}% ${percent < 0 ? 'lesser' : 'greater'} than ${(value.controls[index - 1] as FormGroup).controls.label.value}`;
  }

}
