import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "./../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class NewCommonService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS3VtaGVyIE5hZ2FyIFBhbGlrYSIsImVtYWlsIjoia3VtaGVyLmphaXB1ckBnbWFpbC5jb20iLCJyb2xlIjoiVUxCIiwic3RhdGUiOiI1ZGNmOWQ3NTE2YTA2YWVkNDFjNzQ4ZjgiLCJ1bGIiOiI1ZGQyNDcyOTQzN2JhMzFmN2ViNDJmMWIiLCJpc0FjdGl2ZSI6dHJ1ZSwiaXNSZWdpc3RlcmVkIjp0cnVlLCJfaWQiOiI1ZmNiOWYzMDZlN2EwMTM5ZGM2YjYyM2QiLCJwdXJwb3NlIjoiV0VCIiwibGhfaWQiOiI2MmI1NjE0MTM1YWYxMDZiNjA2ZTRlNTUiLCJzZXNzaW9uSWQiOiI2MmIzMGJjZDU3NjE1NTI0ZDlkN2M5ZWMiLCJwYXNzd29yZEV4cGlyZXMiOjE2MTk2MjUzNDQwNzgsInBhc3N3b3JkSGlzdG9yeSI6WyIkMmEkMTAkVmN3dG5oRWNIL0YuTURZNTY1dXZxdS5kRTVxSlpNZFBxcE9SRDl3bUxhd0JCNDYyNC5RS2UiLCIkMmEkMTAkU2IvcC5ublN0N0dvcE9JeXA2OVQ0LmpNTGw0Y2FLRlVYMzJFaDJvTUN6c0pZYjFCbVZST1ciXSwiaWF0IjoxNjU2MDU0MDgxLCJleHAiOjE2NTYwOTAwODF9.W1HmwLdR2xWwA0AyzTY02isE7tVtdckeHLD-WJS1evY'
    })
  }
  getULBLeftMenu() {
    return this.http.get(
      `${environment.api.url}menu?role=ULB&year=606aafb14dff55e6c075d3ae&isUa=false`
      // `https://democityfinanceapi.dhwaniris.in/api/v1?role=ULB&year=606aafb14dff55e6c075d3ae&isUa=false`
    );
  }

  getOdfRatings(){
    return this.http.get(
      `${environment.api.url}ratings`
    )
  }

  odfSubmitForm(body:any){
    return this.http.post(
      `${environment.api.url}gfc-odf-form-collection`,body,this.httpOptions
    )
  }
  getOdfFormData(params){
    return this.http.get(`${environment.api.url}gfc-odf-form-collection${params}`)
  }
}
