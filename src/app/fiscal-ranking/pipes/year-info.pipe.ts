import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'yearInfo'
})
export class YearInfoPipe implements PipeTransform {

  transform(years: FormGroup[], ...args: unknown[]): unknown {
    
    console.log();

    const yearInfos = years.filter((year: any) => year?.controls?.label?.value).map((year: any) => year.controls.label.value + ' ' + year?.controls?.bottomText?.value);

    if(yearInfos.length == 0) return false;

    return yearInfos.join('\n');
  }

}
