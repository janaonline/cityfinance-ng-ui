import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'toStorageUrl'
})
export class ToStorageUrlPipe implements PipeTransform {

  transform(value: string): string {
    if(value){
      return environment.STORAGE_BASEURL + value;
    }else{
      return "";
    }
  }

}
