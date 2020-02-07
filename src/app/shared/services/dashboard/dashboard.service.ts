import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) {


  }

  fetchDependencyOwnRevenueData(year: string) {
    return this.httpClient.get(`${environment.api.url}api/admin/v1/ulblist`);
  }

  fetchULBData(id: string) {
    return this.httpClient.get(`${environment.api.url}api/admin/v1/ulblist`);

  }
}
