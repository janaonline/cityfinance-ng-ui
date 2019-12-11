import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class GlobalLoaderService {
  private _loading = new BehaviorSubject<boolean>(false);

  constructor() {}

  observerLoading() {
    return this._loading;
  }

  stopLoader() {
    this._loading.next(false);
  }

  showLoader() {
    this._loading.next(true);
  }
}
