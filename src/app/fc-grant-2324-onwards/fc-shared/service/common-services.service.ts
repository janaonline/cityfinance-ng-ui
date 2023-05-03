import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

  constructor(
    private http: HttpClient,

  ) { }
  setFormStatusUlb: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  ulbLeftMenuComplete: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  stateLeftMenuComplete: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  formPostMethod(body: any, endPoints:string) {
    return this.http.post(
      `${environment.api.url}${endPoints}`,
      body
    );
  }
  getScroing(formName, dYr) {
    // gfc-odf-form-collection
    return this.http.get(`${environment.api.url}ratings?formName=${formName}&financialYear=${dYr}`);
  }

  formGetMethod(endPoints:string, queryParam:any) {
    return this.http.get(
      `${environment.api.url}${endPoints}`,
       {
        params: queryParam
       }
    );
  }
  minMaxValidation(e, input, minV, maxV) {
    const functionalKeys = ["Backspace", "ArrowRight", "ArrowLeft", "Tab"];
    if (functionalKeys.indexOf(e.key) !== -1) {
      return;
    }

    const keyValue = +e.key;
    if (isNaN(keyValue)) {
      e.preventDefault();
      return;
    }

    const hasSelection =
      input?.selectionStart !== input?.selectionEnd &&
      input?.selectionStart !== null;
    let newValue;
    if (hasSelection) {
      newValue = this.replaceSelection(input, e.key);
    } else {
      newValue = input?.value + keyValue?.toString();
    }

    if (
      +newValue > maxV ||
      newValue.length > maxV?.length ||
      +newValue < minV ||
      e.key == " "
    ) {
      e.preventDefault();
    }
  }

  private replaceSelection(input, key) {
    const inputValue = input?.value;
    const start = input?.selectionStart;
    const end = input?.selectionEnd || input?.selectionStart;
    return inputValue.substring(0, start) + key + inputValue.substring(end + 1);
  }
  formDisable(res, userData){
    if(userData?.role != 'ULB'){
      return false;
    }else if(userData?.role == 'ULB' && (res?.statusId == 3 || res?.statusId == 4 || res?.statusId == 6)){
      return false;
    }else if(userData?.role == 'ULB' && (res?.statusId == 5 || res?.statusId == 7)){
      return true;
    }else {
      return true;
    }
 }
}
