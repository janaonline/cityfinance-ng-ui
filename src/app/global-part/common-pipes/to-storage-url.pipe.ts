import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})

@Pipe({
  name: 'toStorageUrl'
})
export class ToStorageUrlPipe implements PipeTransform {

  transform(value: string): string {
    if (value && value.toLowerCase().startsWith('https://')) {
      return value;
    } else if (value) {
      return environment.STORAGE_BASEURL + value;
    } else {
      return '';
    }
    // if(value){
    //   return environment.STORAGE_BASEURL + value;
    // }else{
    //   return "";
    // }
  }

}
