import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpUtility } from 'src/app/util/httpUtil';
import { environment } from 'src/environments/environment';

import { IQuestionnaireResponse } from '../model/questionnaireResponse.interface';

@Injectable({
  providedIn: "root",
})
export class QuestionnaireService {
  private readonly httpUtility = new HttpUtility();
  constructor(private http: HttpClient) {}

  getStateQuestionnaireData(queryParams: { [key: string]: any }) {
    const params = this.httpUtility.convertToHttpParams(queryParams);

    return this.http
      .get<IQuestionnaireResponse>(`${environment.api.url}state/form`, {
        params,
      })
      .pipe(map((res) => res.data[0]));
  }

  getULBQuestionnaireData(queryParams: { [key: string]: any }) {
    const params = this.httpUtility.convertToHttpParams(queryParams);

    return this.http
      .get<IQuestionnaireResponse>(`${environment.api.url}ulb/form`, {
        params,
      })
      .pipe(map((res) => res.data[0]));
  }

  saveStateQuestionnaireData(data: { [key: string]: any }) {
    return this.http.post(`${environment.api.url}state/form`, {
      ...data,
    });
  }
  saveULBQuestionnaireData(data: { [key: string]: any }) {
    console.log(data);
    return this.http.post(`${environment.api.url}ulb/form`, {
      ...data,
    });
  }

  getStateQuestionnaireFilledList(body: { filter?: {}; sort?: {} }) {
    if (!body.filter) {
      body.filter = {};
    }
    if (!body.sort) {
      body.sort = {};
    }
    let params = new HttpParams();
    Object.keys(body).forEach((key) => {
      if (typeof body[key] === "object") {
        const value = JSON.stringify(body[key]);

        params = params.append(key, value);
      } else {
        params = params.append(key, body[key]);
      }
    });

    return this.http.get(environment.api.url + `state/form/all`, { params });
  }

  getULBQuestionnaireFilledList(body: { filter?: {}; sort?: {} }) {
    if (!body.filter) {
      body.filter = {};
    }
    if (!body.sort) {
      body.sort = {};
    }
    let params = new HttpParams();
    Object.keys(body).forEach((key) => {
      if (typeof body[key] === "object") {
        const value = JSON.stringify(body[key]);

        params = params.append(key, value);
      } else {
        params = params.append(key, body[key]);
      }
    });

    return this.http.get(environment.api.url + `ulb/form/all`, { params });
  }

  getStateWithoutQuestionnaireFilled() {
    return this.http
      .get(`${environment.api.url}state?type=filter`)
      .pipe(map((res) => res["data"]));
  }

  downloadPDF(body) {
    return this.http.post(`${environment.api.url}download/pdf`, body, {
      responseType: "blob",
    });
  }
}
