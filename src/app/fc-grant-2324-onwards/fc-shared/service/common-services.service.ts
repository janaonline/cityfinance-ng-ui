import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { USER_TYPE } from 'src/app/models/user/userType';
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
  setFormStatusState: BehaviorSubject<any> = new BehaviorSubject<any>(false);
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
  minMaxValidation(e, input, minV, maxV, type?:string) {
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
      let arr = input?.value.toString().split("")
      newValue = arr.slice(0,input?.selectionStart).join("")+e.key+arr.slice(input?.selectionEnd,arr.length).join("");
    }
    
    const numToStringLen = (maxV.toString()).length;
    // if(Number(input?.value) == 0 && e.key == 0){
    // //  e.preventDefault();
    // //  input.value = 0;
    // }
    if(type == 'exactNum' && (+newValue > maxV ||  +newValue < minV || e.key == " ")) {
      e.preventDefault();
    }
    if((type != 'exactNum') && (+newValue >= maxV || newValue.length > numToStringLen-1 || +newValue < minV || e.key == " " )) {
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
    if(userData?.role != USER_TYPE.ULB) return false;
    return [1, 2, 5, 7].includes(res?.statusId);
 }
}
