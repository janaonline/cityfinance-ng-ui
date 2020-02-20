import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'roundoff'
})
export class RoundoffPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let newVal = value;
    if (args.config) {
      const {roundOff} = args.config;
      if (roundOff) {
        newVal = newVal / Math.pow(10, 7);
        newVal = Number(newVal).toFixed(2);
      }
    }
    return newVal;
  }
}
