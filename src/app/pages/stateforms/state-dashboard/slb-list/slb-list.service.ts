import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class SlbListService {

  constructor(private http: HttpClient) { }

  getData(state_id) {
    if (state_id) {
      let sendUrl = environment.api.url + `masterForm/dashboard-viewList/606aaf854dff55e6c075d219/slb?state_id=${state_id}`;
      return this.http.get(sendUrl)
    } else {
      let sendUrl = environment.api.url + 'masterForm/dashboard-viewList/606aaf854dff55e6c075d219/slb';
      return this.http.get(sendUrl)
    }


  }
}
