import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../../services/utility.service';
import { UserInfoDialogComponent } from './user-info-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DownloadUserInfoService {

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    public utilityService: UtilityService
  ) { }

  public getUserInfoQuestions(endPoint: string) {
    return this.http.get(environment.api.url + endPoint);
  }

  // Get user info before viewing/ downloading file (update that in db).
  public openUserInfoDialog(fileDetails: any, module: string): Promise<boolean> {

    const downloadInfo = { module: module, fileDownloaded: fileDetails }; // Info about the file download for backend payload.
    const moduleInfo = { saveToLocalStorage: true, endPoint: 'file-download-log/userInfo' }; // Frontend config flags for handling the module.
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // console.log('service: ', userInfo)

    return new Promise((resolve) => {
      if (userInfo && userInfo.isEmailVerified) {
        const userData = { ...userInfo, ...downloadInfo };
        this.updateDownloadUserInfoToDb(userData)
          .then(() => resolve(true))
          .catch(() => resolve(false));
      } else {
        const dialogRef = this.dialog.open(UserInfoDialogComponent, { data: { downloadInfo, moduleInfo } });

        dialogRef.afterClosed().subscribe((data) => {
          if (data) {
            this.updateDownloadUserInfoToDb(data)
              .then(() => resolve(true))
              .catch(() => resolve(false));
          } else resolve(false);
        });
      }
    });

  }

  private updateDownloadUserInfoToDb(params: any): Promise<boolean> {
    return new Promise((resolve, reject) => {

      this.http.post(environment.api.url + 'file-download-log/userInfo', params).subscribe({
        next: () => { resolve(true) },
        error: (err) => {
          this.utilityService.swalPopup('Validation Failed!', err.error.message, 'error');
          console.error(err);
          localStorage.removeItem('userInfo');
          reject(false);
        },
      });

    });

  }

}
