import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { environment } from 'src/environments/environment';
import { DownloadUserInfoService } from '../../user-info-dialog/download-user-info.service';
import { BalanceTableComponent } from '../balance-table.component';


@Component({
  selector: 'app-balance-tabledialog',
  templateUrl: './balance-tabledialog.component.html',
  styleUrls: ['./balance-tabledialog.component.scss']
})
export class BalanceTabledialogComponent implements OnInit {

  reports: any = [];
  fileType: string = '';
  ulbDetails: any = {};

  constructor(
    public dialogRef: MatDialogRef<BalanceTableComponent>,
    private userInfoService: DownloadUserInfoService,
    private utilityService: UtilityService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.reports = data?.reportList;
    this.fileType = data?.fileType;
    this.ulbDetails = data?.ulbDetails;
  }

  ngOnInit(): void {
  }

  public openFile(fileInfo: any): void {
    let target_file_url = environment.STORAGE_BASEURL + fileInfo['url'];

    // User info popup.
    if (this.ulbDetails && ['resources'].includes(this.ulbDetails['module'])) {
      const fileName = `${this.ulbDetails['fileName']}_${this.ulbDetails['type']}_${fileInfo['name']}.${this.fileType}`;

      this.userInfoService.openUserInfoDialog([{ fileName }], this.ulbDetails['module'])
        .then((isDialogConfirmed) => {
          if (isDialogConfirmed) {
            if (this.fileType === "pdf") window.open(target_file_url, '_blank');
            if (this.fileType === "excel") this.utilityService.fetchAndSaveFile(target_file_url, fileInfo['name']);
          }
          return;
        });
    } else {
      if (this.fileType === "pdf") window.open(target_file_url, '_blank');
      if (this.fileType === "excel") this.utilityService.fetchAndSaveFile(target_file_url, fileInfo['name']);
    }

    return;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
