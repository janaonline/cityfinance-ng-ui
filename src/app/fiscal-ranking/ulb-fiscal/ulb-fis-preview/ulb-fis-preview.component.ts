import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ulb-fis-preview',
  templateUrl: './ulb-fis-preview.component.html',
  styleUrls: ['./ulb-fis-preview.component.scss']
})
export class UlbFisPreviewComponent implements OnInit {
  // fiscalService: any;
  // yearIdArr: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _router: Router
  ) { }

  ngOnInit(): void {
    //preview data
    console.log('preview data', this.data)
  }



  // onLoad() {
  //   this.fiscalService.getfiscalUlbForm(this.yearIdArr['2022-23'], this.ulbId).subscribe((res: any) => {
  //     console.log('fiscal res', res);
  //     this.formObjKey = res?.fyDynemic;
  //   },
  //     (error) => {
  //       console.log(error);
  //     }
  //   )
  // }

  // ulbId(arg0: any, ulbId: any) {
  //   throw new Error('Method not implemented.');
  // }

}
