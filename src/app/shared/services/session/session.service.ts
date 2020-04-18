import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }


  generateSessionID() {
    const sessionID =  sessionStorage.get(`sessionID`);
    if(sessionID) return of({data: {_id: sessionID}})
    return this.http.get(`${environment.api.url}start_session`).pipe(
      map(res => {
         sessionStorage.setItem(`sessionID`, res['data']._id);
         return res;
      })
    );
  }


  endSession(sessionId: string) {
    return this.http.get(`${environment.api.url}end_session/${sessionId}`);
  }
}
