import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'toStorageUrl'
})
export class ToStorageUrlPipe implements PipeTransform {

  transform(value: string): unknown {
    return environment.STORAGE_BASEURL + value;
  }

}
