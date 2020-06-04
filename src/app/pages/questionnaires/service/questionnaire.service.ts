import { HttpClient } from '@angular/common/http';
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
  constructor(private http: HttpClient) {
    console.log(`QuestionnaireService`);
  }

  getQuestionnaireData(userId: string) {
    console.log(`getQuestionnaireData`, userId);
    const params = this.httpUtility.convertToHttpParams({ state: userId });

    return this.http
      .get<IQuestionnaireResponse>(`${environment.api.url}state/form`, {
        params,
      })
      .pipe(map((res) => res.data[0]));
  }

  saveQuestionnaireData(data: { [key: string]: string }) {
    console.log(`saveQuestionnaireData`);
    return this.http.post(`${environment.api.url}state/form`, {
      body: { ...data },
    });
  }
}
