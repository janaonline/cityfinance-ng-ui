import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OverallListService {

  constructor(private http: HttpClient) { }

  getData(state_id) {
    if (state_id) {
      let sendUrl = environment.api.url + `masterForm/dashboard-viewList/606aaf854dff55e6c075d219?state_id=${state_id}`;
      return this.http.get(sendUrl)
    }
    let sendUrl = environment.api.url + 'masterForm/dashboard-viewList/606aaf854dff55e6c075d219';
    return this.http.get(sendUrl)

  }

}
