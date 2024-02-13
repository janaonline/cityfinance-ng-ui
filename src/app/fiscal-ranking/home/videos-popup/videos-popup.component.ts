import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { log } from 'console';
import { ToStorageUrlPipe } from 'src/app/gobal-part/common-pipes/to-storage-url.pipe';

@Component({
  selector: 'app-videos-popup',
  templateUrl: './videos-popup.component.html',
  styleUrls: ['./videos-popup.component.scss']
})
export class VideosPopupComponent implements OnInit {

  videoLink = 'https://jana-cityfinance-live.s3.ap-south-1.amazonaws.com/FiscalRanking/knowMoreVideo_6b2e991a-1d08-433f-b566-a61f515cba53.mp4';

  constructor(
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public viderUrlData: any,
  ) { }

  ngOnInit(): void {
    console.log('viderUrlData', this.viderUrlData);
    this.videoLink =  new ToStorageUrlPipe().transform(this.viderUrlData?.latestVideofileUrl);
  }

  close() {
    this.matDialog.closeAll();
  }
}
