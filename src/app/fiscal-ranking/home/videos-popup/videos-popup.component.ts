import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-videos-popup',
  templateUrl: './videos-popup.component.html',
  styleUrls: ['./videos-popup.component.scss']
})
export class VideosPopupComponent implements OnInit {

  videoLink = 'https://jana-cityfinance-live.s3.ap-south-1.amazonaws.com/FiscalRanking/knowMoreVideo_6b2e991a-1d08-433f-b566-a61f515cba53.mp4';

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.matDialog.closeAll();
  }
}
