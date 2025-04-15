import { Injectable } from '@angular/core';
import { UserInfoDialogComponent } from './user-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../../services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadUserInfoService {

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    public utilityService: UtilityService
  ) { }

  public getUserInfoQuestions() {
    return this.http.get(environment.api.url + 'file-download-log/userInfo');
  }

  // Get user info before viewing/ downloading file (update that in db).
  public openUserInfoDialog(fileDetails: any, module: string): Promise<boolean> {
    const downloadInfo = { module: module, fileDownloaded: fileDetails };
    const userInfo = localStorage.getItem('userInfo');

    return new Promise((resolve) => {
      if (userInfo) {
        const userData = { ...JSON.parse(userInfo), ...downloadInfo };
        this.updateDownloadUserInfoToDb(userData)
          .then(() => resolve(true))
          .catch(() => resolve(false));
      } else {
        const dialogRef = this.dialog.open(UserInfoDialogComponent, { data: { downloadInfo } });

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
