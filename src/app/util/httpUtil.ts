import { HttpParams } from '@angular/common/http';

export class HttpUtility {
  public convertToHttpParams(params: { [key: string]: string }) {
    let queryParams = new HttpParams();
    // tslint:disable-next-line: forin
    for (const key in params) {
      if (params[key]) {
        queryParams = queryParams.set(key, params[key]);
      }
    }
    return queryParams;
  }
}
