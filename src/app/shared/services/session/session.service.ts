import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }


  generateSessionID() {
    return this.http.get(`${environment.api.url}start_session`);
  }


  endSession(sessionId: string) {
    return this.http.get(`${environment.api.url}end_session/${sessionId}`);
  }
}
