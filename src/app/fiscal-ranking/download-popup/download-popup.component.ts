import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-download-popup',
  templateUrl: './download-popup.component.html',
  styleUrls: ['./download-popup.component.scss']
})
export class DownloadPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }
  simpleDownload(url){
    const link = this.renderer.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', `${url}`);
      link.setAttribute('download', `CityFinance_Ranking_2022_${this.data?.key}.pdf`);
      link.click();
      link.remove();
  }
  closeDia(){
    this.dialog.closeAll();
  }
}
