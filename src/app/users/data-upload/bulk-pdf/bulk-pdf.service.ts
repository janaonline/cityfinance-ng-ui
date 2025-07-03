import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BulkPDFUploadService {
    constructor(private http: HttpClient) { }


    getSignedUrl(file: File, fy: string) {
        const folder = `budgets/${fy.replace('FY ', '')}`;
        const requestBody = [{
            file_name: file.name,
            folder: folder,
            mime_type: file.type
        }];
        return this.http.post(environment.api.url + `getS3Url`, requestBody);
    }

    async uploadToS3(signedUrl: string, file: File): Promise<void> {
        const response = await fetch(signedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type
            },
            body: file
        });

        if (!response.ok) {
            throw new Error('S3 upload failed');
        }
    }
    getUlbList(code: string | string[]): Observable<any> {
        let params = new HttpParams();

        if (Array.isArray(code)) {
            code.forEach(c => {
                params = params.append('code', c);
            });
        } else {
            params = params.set('code', code);
        }

        return this.http.get<any>(`${environment.api.url}budget-documents/getUlbList`, { params });
    }

    uploadBulkPdfData(uploadData: any[]): Observable<any> {
        return this.http.post(`${environment.api.url}budget-documents/uploadDataBulkPdf`, uploadData);
    }
    yearsData(yearsData): Observable<any> {
        const url = `${environment.api.url}/budget-documents/getYearEmptyData`;
        const params = new HttpParams().set('yearsData', yearsData);

        return this.http.get<any>(url, { params });
    }
}