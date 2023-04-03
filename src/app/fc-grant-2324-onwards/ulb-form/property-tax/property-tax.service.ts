import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PropertyTaxService {

  constructor(
    private http: HttpClient,
  ) { }

  downloadFile(blob: any, type: string, filename: string): string {
    const url = window.URL.createObjectURL(blob); // <-- work with blob directly

    // create hidden dom element (so it works in all browsers)
    const a = document.createElement("a");
    a.setAttribute("style", "display:none;");
    document.body.appendChild(a);

    // create file, attach to hidden element and open hidden element
    a.href = url;
    a.download = filename;
    a.click();
    return url;
  }

  getForm(ulb: string, design_year: string) {
    return this.http.get(`${environment.api.url}propTaxOp/view?ulb=${ulb}&design_year=${design_year}`);
  }

  postData(body) {
    return this.http.post(`${environment.api.url}propTaxOp/create-form`, body);
  }
}
