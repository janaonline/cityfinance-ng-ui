import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { S3FileURLResponse } from '../../models/s3Responses/fileURLResponse';

@Injectable({
  providedIn: "root"
})
export class DataEntryService {
  constructor(private http: HttpClient) {}

  bulkEntry(files) {
    const httpOptions = {
      headers: new HttpHeaders({ Accept: "multipart/form-data" })
    };
    return this.http.post(environment.api.url + "ledger/bulkEntry", files, {
      ...httpOptions,
      reportProgress: true,
      observe: "events"
    });
  }

  createEntry(ledgerForm) {
    const httpOptions = {
      headers: new HttpHeaders({ Accept: "multipart/form-data" })
    };
    return this.http.post(
      environment.api.url + "ledger/entry",
      ledgerForm,
      httpOptions
    );
  }

  getLedgerLogs(criteria) {
    return this.http.post(environment.api.url + "ledger/getAll", criteria);
  }

  excelToJsonConvertor(files) {
    const httpOptions = {
      headers: new HttpHeaders({ Accept: "multipart/form-data" })
    };
    return this.http.post(
      environment.api.url + "ledger/excelToJsonConvertor",
      files,
      httpOptions
    );
  }

  getURLForFileUpload(fileName: File["name"], fileType: File["type"]) {
    const headers = new HttpHeaders();

    return this.http.post<S3FileURLResponse>(
      `${environment.api.url}/getSignedUrl`,
      JSON.stringify([
        {
          file_name: fileName,
          mime_type: fileType
        }
      ]),
      { headers }
    );

    // return this.http.post(
    //   "https://stgmformadminapi.dhwaniris.in//" + "getS3Url",
    //   JSON.stringify([
    //     {
    //       file_name: fileName,
    //       mime_type: fileType
    //     }
    //   ]),
    //   { headers }
    // );
  }

  uploadFileToS3(
    file: File,
    s3URL: string,
    options = { reportProgress: true }
  ) {
    return this.http.put(s3URL, file, {
      reportProgress: options.reportProgress,
      observe: "events"
    });
  }

  /**
   *
   * @param alias Here fileAlias is the file_alias key that is returned from getting s3URL api call.
   */
  sendUploadFileForProcessing(alias: string, financialYear: string) {
    return this.http.post(`${environment.api.url}/processData`, {
      alias,
      financialYear
    });
  }

  getFileProcessingStatus(
    fileId: string
  ): Observable<{ message: string; completed: boolean; status: "FAILED" }> {
    // IMPORTANT Comment this and uncomment below line. Some changes may be required there...
    // return of({
    //   status: Math.random() > 0.5,
    //   message: "somethin sometinh"
    // }).pipe(delay(2000));

    return this.http
      .get(`${environment.api.url}/getProcessStatus/${fileId}`)
      .pipe(map(response => ({ ...response["data"] })));
  }
}
