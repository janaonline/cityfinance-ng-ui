import { HttpParams } from '@angular/common/http';

export class HttpUtility {
  public convertToHttpParams(params: { [key: string]: string }) {
    let queryParams = new HttpParams();
    // tslint:disable-next-line: forin
    for (const key in params) {
      if (params[key]) {
        queryParams = queryParams.set(
          key,
          typeof params[key] === "string" ? params[key].trim() : params[key]
        );
      }
    }
    return queryParams;
  }
}
