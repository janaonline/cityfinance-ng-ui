import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class AccountReactivateService {
  constructor(private _http: HttpClient) {}

  sendReactivationEmail(body) {
    return this._http.post(
      `${environment.api.url}/resend_verification_link`,
      body
    );
  }
}
