import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpUtility } from 'src/app/util/httpUtil';

import { environment } from '../../../environments/environment';
import { S3FileURLResponse } from '../../models/s3Responses/fileURLResponse';
import { filter, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class DataEntryService {
  constructor(private http: HttpClient) {}

  httpUtil = new HttpUtility();

  bulkEntry(files) {
    const httpOptions = {
      headers: new HttpHeaders({ Accept: "multipart/form-data" }),
    };
    return this.http.post(environment.api.url + "ledger/bulkEntry", files, {
      ...httpOptions,
      reportProgress: true,
      observe: "events",
    });
  }

  createEntry(ledgerForm) {
    const httpOptions = {
      headers: new HttpHeaders({ Accept: "multipart/form-data" }),
    };
    return this.http.post(
      environment.api.url + "ledger/entry",
      ledgerForm,
      httpOptions
    );
  }

  getLedgerLogs(criteria) {
    const params = this.httpUtil.convertToHttpParams(criteria);
    return this.http.get(
      environment.api.url + "ulb-financial-data/approved-records",
      { params }
    );
  }

  getFileList(id) {
    return this.http.get(
      environment.api.url + "ulb-financial-data/source-files/" + id
    );
  }

  excelToJsonConvertor(files) {
    const httpOptions = {
      headers: new HttpHeaders({ Accept: "multipart/form-data" }),
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
          mime_type: fileType,
        },
      ]),
      { headers }
    );

  }
  newGetURLForFileUpload(fileName: File["name"], fileType: File["type"], folderName?: string) {
    const headers = new HttpHeaders();
    return this.http.post<S3FileURLResponse>(
      `${environment.api.url}/getS3Url`,
      JSON.stringify([
        {
          folder: folderName,
          file_name: fileName.replace(/[~`!#$%^&*+=\[\]\\';,/{}|\\":<>?@]/g, '_'),
          mime_type: fileType,
        },
      ]),
      { headers }
    );
    // .pipe(map((response) => this.changeKeys(response['data'][0])));
  }
  changeKeys(el){
    let formattedObj = {
      data : [
        {
          file_url : el?.file_alias,
          url : el?.url,
          file_name : el?.file_name,
          host : el?.host,
          mime_type : el?.mime_type
        }
      ]
    }
    return formattedObj;

  }
  uploadFileToS3(
    file: File,
    s3URL: string,
    options = { reportProgress: true }
  ) {
    return this.http.put(s3URL, file, {
      reportProgress: options.reportProgress,
      observe: "events",
    });
  }


  /**
   *
   * @param alias Here fileAlias is the file_alias key that is returned from getting s3URL api call.
   */
  sendUploadFileForProcessing(alias: string, financialYear: string="") {
    return this.http.post(`${environment.api.url}/processData`, {
      alias,
      financialYear,
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
      .pipe(map((response) => ({ ...response["data"] })));
  }

  // newGetURLForFileUpload(fileName: File["name"], fileType: File["type"]) {
  //   const headers = new HttpHeaders();

  //   return this.http.post<S3FileURLResponse>(
  //     `${environment.api.url}/getS3Url`,
  //     JSON.stringify([
  //       {
  //         file_name: fileName,
  //         mime_type: fileType,
  //       },
  //     ]),
  //     { headers }
  //   );

  // }

  newUploadFileToS3(
    file: File,
    s3URL: string,
    options = { reportProgress: true }
  ) {
    return this.http.put(s3URL, file, {
      reportProgress: options.reportProgress,
      observe: "events",
    });
  }
  checkSpcialCharInFileName(files){
    let file = files[0];
    let name = ((file.name).split('.'))[0];
    let iChars = "~`!#$%^&*+=[]\\\';,/{}|\":<>?@";
    for (let i = 0; i < name.length; i++) {
       if (iChars.indexOf(name.charAt(i)) != -1) {
           return false;
       }
    }
    return true;
  }
}
