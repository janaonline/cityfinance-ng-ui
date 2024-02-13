import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class UtilityService {
  constructor() {}

  jsonToFormData(jsonObj, ignoreKeys: string[], formData: FormData): FormData {
    // let formData: FormData = new FormData();
    const keys = Object.keys(jsonObj);
    for (let i = 0; i < keys.length; i++) {
      if (ignoreKeys.indexOf(keys[i]) > -1) {
        continue;
      }
      formData.append(keys[i], jsonObj[keys[i]]);
    }
    return formData;
  }

  debounce(func, delay) {
    let timerId;
    return function (...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  } 
}
