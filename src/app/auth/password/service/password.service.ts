import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class PasswordService {
  constructor(private _http: HttpClient) {}

  requestPasswordReset(body: {}) {
    return this._http.post(`${environment.api.url}/forgot_password`, body);
  }

  resetPassword(body: {}) {
    return this._http.post(`${environment.api.url}/reset_password`, body);
  }
}
