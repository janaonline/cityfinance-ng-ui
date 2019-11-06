import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataEntryService {

  constructor(private http: HttpClient) { }

  bulkEntry(files){
    const httpOptions = { headers: new HttpHeaders({'Accept': 'multipart/form-data'}) };
    return this.http.post(environment.api.url + 'ledger/bulkEntry', files, httpOptions );

  }

  createEntry(ledgerForm){
    const httpOptions = { headers: new HttpHeaders({'Accept': 'multipart/form-data'}) };
    return this.http.post(environment.api.url + 'ledger/entry', ledgerForm, httpOptions );
  }

  getLedgerLogs(criteria){
    return this.http.post(environment.api.url + 'ledger/getAll', criteria );
  }


  excelToJsonConvertor(files){
    const httpOptions = { headers: new HttpHeaders({'Accept': 'multipart/form-data'}) };
    return this.http.post(environment.api.url + 'ledger/excelToJsonConvertor', files, httpOptions );
  }

}
