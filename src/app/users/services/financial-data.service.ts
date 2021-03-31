import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtility } from 'src/app/util/httpUtil';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class FinancialDataService {
  constructor(private httpClient: HttpClient) {}
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

  getFinancialDataListApi(body = {}) {
    body["token"] = localStorage
      .getItem("id_token")
      .replace('"', "")
      .replace('"', "");
    body["csv"] = true;
    let params = new HttpParams();
    Object.keys(body).forEach((key) => {
      if (typeof body[key] === "object") {
        const value = JSON.stringify(body[key]);
        params = params.append(key, value);
      } else {
        params = params.append(key, body[key]);
      }
    });
    return `${environment.api.url}ulb-financial-data/all?${params}`;
  }

  updateActionOnFinancialData(data: { [key: string]: any }, requestId: string) {
    return this.httpClient.post(
      `${environment.api.url}ulb-financial-data/action/${requestId}`,
      data
    );
  }

  fetFinancialData(id: string) {
    return this.httpClient.get(
      `${environment.api.url}ulb-financial-data/details/${id}`
    );
  }

  saveStateFCDocuments(body) {
    return this.httpClient.post(
      `${environment.api.url}ulb-financial-data//fc-grant/stateForm`,
      body
    );
  }
  getStateFCDocuments(param: { [key: string]: any }) {
    return this.httpClient.get(this.getStateFCDocumentApi(param));
  }

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
    return `${environment.api.url}ulb-financial-data/fc-grant/stateForm?${params}`;
  }

  fetchFinancialDataHistory(id) {
    return this.httpClient.get(
      `${environment.api.url}ulb-financial-data/history/${id}`
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
