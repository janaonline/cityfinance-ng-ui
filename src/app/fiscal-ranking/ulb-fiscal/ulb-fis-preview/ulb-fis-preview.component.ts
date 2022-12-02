import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ulb-fis-preview',
  templateUrl: './ulb-fis-preview.component.html',
  styleUrls: ['./ulb-fis-preview.component.scss']
})
export class UlbFisPreviewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _router: Router
  ) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    if (this.userData?.role == "ULB") {
      this.ulbName = this.userData?.name;
      this.ulbId = this.userData?.ulb;
    }
    this.stateName = this.userData?.stateName;
   }

  userData;
  ulbName = '';
  stateName = '';
  yearIdArr;
  ulbId = "";
  ngOnInit(): void {
    //preview data
    console.log('preview data', this.data)
  }
  returnZero() {
    return 0;
  }
  closeMat(){
    this.dialog.closeAll();
  }
  downloadAsPdf(){

  }

}
