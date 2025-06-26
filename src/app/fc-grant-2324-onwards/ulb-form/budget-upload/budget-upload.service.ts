import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BudgetUploadService {
    constructor(private http: HttpClient) { }

    getYearsData(ulb: string) {
        return this.http.get(environment.api.url + `budget-documents/getYearsData?ulb=${ulb}`)
    }
    getValidationConfig() {
        return this.http.get(environment.api.url + `budget-documents/getValidations`)
    }

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

    updatePdfs(ulb: string, body: any) {
        return this.http.post(`${environment.api.url}budget-documents/updatePdfs?ulb=${ulb}`, body);
    }
}