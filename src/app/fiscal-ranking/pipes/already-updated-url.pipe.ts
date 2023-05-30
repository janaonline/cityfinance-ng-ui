import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'alreadyUpdatedUrl'
})
export class AlreadyUpdatedUrlPipe implements PipeTransform {

  transform(year: string, stateCode: string,ulbName:string): unknown {
    return `/resources-dashboard/data-sets/balanceSheet?ulbName=${ulbName}&stateCode=${stateCode}&year=${year?.split(' ')?.[1]}`;
  }

}
