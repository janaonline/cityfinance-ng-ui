import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpUtility } from 'src/app/util/httpUtil';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class FinancialDataService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }
  public selectedFinancialRequest = null;
  public financialYears = null;

  jsonUtil = new JSONUtility();

  httpUtil = new HttpUtility();

  fetchFinancialDataList(params = {}, body = {}) {
    let queryParams = new HttpParams(params);
    for (const key in params) {
      queryParams = queryParams.set(
        key,
        typeof params[key] === "string" ? params[key].trim() : params[key]
      );
    }
    for (const key in body) {
      queryParams = queryParams.set(
        key,
        JSON.stringify(
          typeof body[key] === "string" ? body[key].trim() : body[key]
        )
      );
    }
    return this.httpClient.get(`${environment.api.url}ulb-financial-data/all`, {
      params: queryParams,
    });
  }

  fetchXVFormDataList(params = {}, body = {}) {
    let queryParams = new HttpParams();
    for (const key in params) {
      queryParams = queryParams.set(
        key,
        typeof params[key] === "string" ? params[key].trim() : params[key]
      );
    }
    for (const key in body) {
      queryParams = queryParams.set(
        key,
        JSON.stringify(
          typeof body[key] === "string" ? body[key].trim() : body[key]
        )
      );
    }

    return this.httpClient.get(`${environment.api.url}xv-fc-form/all/606aadac4dff55e6c075c507`, {
      params: queryParams,
    });
  }

  fetStateForULBUnderMoHUA(formStatus?: string) {
    const params = this.httpUtil.convertToHttpParams({ formStatus });
    return this.httpClient.get(
      `${environment.api.url}ulb-financial-data/state
`,
      { params }
    );
  }

  approveMultiSelectULBs(documentId: string) {
    // For testing. This will throw error 'Action already taken on form'
    // return this.httpClient.post(
    //   `https://democityfinanceapi.dhwaniris.in/api/v1/ulb-financial-data/multiple-approve-action/5fe447716783372717fa2e3e`,
    //   {}
    // );
    return this.httpClient.post(
      `${environment.api.url}ulb-financial-data/multiple-approve-action/${documentId}`,
      { testing: "" }
    );
  }

  rejectMultiSelectULBs(documentId: string, rejectReason: string) {
    // For testing. This will throw error 'Action already taken on form'
    // return this.httpClient.post(
    //   `https://democityfinanceapi.dhwaniris.in/api/v1/ulb-financial-data/multiple-approve-action/5fe447716783372717fa2e3e`,
    //   {}
    // );
    return this.httpClient.post(
      `${environment.api.url}ulb-financial-data/multiple-reject-action/${documentId}`,
      { rejectReason }
    );
  }

  // getFinancialDataListApi(body = {}) {
  //   body["token"] = this.authService.getAccessToken() || "";
  //   body["csv"] = true;
  //   let params = new HttpParams();
  //   Object.keys(body).forEach((key) => {
  //     if (typeof body[key] === "object") {
  //       const value = JSON.stringify(body[key]);
  //       params = params.append(key, value);
  //     } else {
  //       params = params.append(key, body[key]);
  //     }
  //   });
  //   return `${environment.api.url}ulb-financial-data/all?${params}`;
  // }

  downloadFinancialDataList(body: any = {}): Observable<HttpResponse<Blob>> {
    const payload = {
      ...body,
      csv: true,
    };

    let params = new HttpParams();

    Object.keys(payload).forEach((key) => {
      const value = payload[key];

      if (value === undefined || value === null || value === '') {
        return;
      }

      if (typeof value === 'object') {
        params = params.append(key, JSON.stringify(value));
      } else {
        params = params.append(key, String(value));
      }
    });

    return this.httpClient.get(`${environment.api.url}ulb-financial-data/all`, {
      params,
      observe: 'response',
      responseType: 'blob',
    });
  }

  // getXVFcFormDataListApi(body = {}) {
  //   body["token"] = this.authService.getAccessToken() || "";
  //   body["csv"] = true;
  //   let params = new HttpParams();
  //   Object.keys(body).forEach((key) => {
  //     if (typeof body[key] === "object") {
  //       const value = JSON.stringify(body[key]);
  //       params = params.append(key, value);
  //     } else {
  //       params = params.append(key, body[key]);
  //     }
  //   });

  //   return `${environment.api.url}/xv-fc-form/all/606aadac4dff55e6c075c507?${params}`;
  // }

  downloadXVFcFormDataList(body: any = {}): Observable<HttpResponse<Blob>> {
    const payload = {
      ...body,
      csv: true,
    };

    let params = new HttpParams();

    Object.keys(payload).forEach((key) => {
      const value = payload[key];

      if (value === undefined || value === null || value === '') {
        return;
      }

      if (typeof value === 'object') {
        params = params.append(key, JSON.stringify(value));
      } else {
        params = params.append(key, String(value));
      }
    });

    return this.httpClient.get(
      `${environment.api.url}/xv-fc-form/all/606aadac4dff55e6c075c507`,
      {
        params,
        observe: 'response',
        responseType: 'blob',
      }
    );
  }

  updateActionOnFinancialData(data: { [key: string]: any }, requestId: string) {
    return this.httpClient.post(
      `${environment.api.url}ulb-financial-data/action/${requestId}`,
      data
    );
  }

  updateActionOnXVFcFormData(data: { [key: string]: any }, requestId: string) {
    return this.httpClient.post(
      `${environment.api.url}xv-fc-form/action/${requestId}`,
      data
    );
  }

  fetFinancialData(id: string) {
    return this.httpClient.get(
      `${environment.api.url}ulb-financial-data/details/${id}`
    );
  }

  fetchXVFormDetails(formId: string) {
    return this.httpClient.get(
      `${environment.api.url}xv-fc-form/details/${formId}`
    );
  }

  saveStateFCDocuments(body) {
    return this.httpClient.post(
      `${environment.api.url}xv-fc-form/fc-grant/stateForm`,
      body
    );
  }
  getStateFCDocuments(params: { [key: string]: any }) {
    return this.httpClient.get(this.getStateFCDocumentApi(params));
  }

  // TODO: replace getStateFCDocumentApi() with downloadStateFCDocumentList()
  getStateFCDocumentApi(queryParams: { [key: string]: any } = {}) {
    let params = new HttpParams();
    Object.keys(queryParams).forEach((key) => {
      if (typeof queryParams[key] === "object") {
        const value = JSON.stringify(queryParams[key]);
        params = params.append(key, value);
      } else {
        params = params.append(key, queryParams[key]);
      }
    });
    return `${environment.api.url}xv-fc-form/fc-grant/stateForm?${params}`;
  }

  downloadStateFCDocumentList(
    queryParams: { [key: string]: any } = {}
  ): Observable<HttpResponse<Blob>> {
    let params = new HttpParams();

    const payload = {
      ...queryParams,
      csv: true,
    };

    Object.keys(payload).forEach((key) => {
      const value = payload[key];

      if (value === undefined || value === null || value === '') {
        return;
      }

      if (typeof value === 'object') {
        params = params.append(key, JSON.stringify(value));
      } else {
        params = params.append(key, String(value));
      }
    });

    return this.httpClient.get(
      `${environment.api.url}xv-fc-form/fc-grant/stateForm`,
      {
        params,
        observe: 'response',
        responseType: 'blob',
      }
    );
  }

  fetchXVFcFormDataHistory(id) {
    return this.httpClient.get(
      `${environment.api.url}xv-fc-form/history/${id}`
    );
  }

  fetchFinancialDataHistory(id) {
    return this.httpClient.get(
      `${environment.api.url}ulb-financial-data/history/${id}`
    );
  }

  uploadXVFcFormData(data: any) {
    const newData = this.jsonUtil.convert(data);
    return this.httpClient.post(
      `${environment.api.url}xv-fc-form`,
      JSON.stringify(newData)
    );
  }

  uploadFinancialData(data: any) {
    const newData = this.jsonUtil.convert(data);
    return this.httpClient.post(
      `${environment.api.url}ulb-financial-data`,
      JSON.stringify(newData)
    );
  }

  upDateFinancialData(id, data) {
    return this.httpClient.put(
      `${environment.api.url}ulb-financial-data/${id}`,
      JSON.stringify(data)
    );
  }

  updateCompletenessStatus(id, data) {
    return this.httpClient.put(
      `${environment.api.url}ulb-financial-data/completeness/${id}`,
      JSON.stringify(data)
    );
  }

  updateCorrectnessStatus(id, data) {
    return this.httpClient.put(
      `${environment.api.url}ulb-financial-data/correctness/${id}`,
      JSON.stringify(data)
    );
  }

  getFinancialYears() {
    return this.httpClient.get(`${environment.api.url}financial-year`);
  }

  getOverAllReportData(financialYear: string = "2015-16") {
    return this.httpClient.get(
      `${environment.api.url}report/financial-data/overall?financialYear=${financialYear}`
    );
  }

  getStateWiseReportData(financialYear: string = "2015-16") {
    return this.httpClient.get(
      `${environment.api.url}report/financial-data/statewise?financialYear=${financialYear}`
    );
  }

  getUlbTypeWiseData(financialYear: string = "2015-16") {
    return this.httpClient.get(
      `${environment.api.url}report/financial-data/ulbtypewise?financialYear=${financialYear}`
    );
  }

  getStateAndUlbTypeWiseData(financialYear: string = "2015-16") {
    return this.httpClient.get(
      `${environment.api.url}report/financial-data/stateandulbtypewise?financialYear=${financialYear}`
    );
  }

  getUsageReportData(financialYear: string = "2015-16") {
    return this.httpClient.get(
      `${environment.api.url}report/usage?financialYear=${financialYear}`
    );
  }
  getChartData(financialYear: string = "2015-16") {
    return this.httpClient.get(
      `${environment.api.url}report/financial-data/chart`
    );
    // return this.httpClient.get(`${environment.api.url}report/financial-data/chart?financialYear=${financialYear}`);
  }
}
