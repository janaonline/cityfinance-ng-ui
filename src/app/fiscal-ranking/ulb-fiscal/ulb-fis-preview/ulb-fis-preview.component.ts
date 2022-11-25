import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ulb-fis-preview',
  templateUrl: './ulb-fis-preview.component.html',
  styleUrls: ['./ulb-fis-preview.component.scss']
})
export class UlbFisPreviewComponent implements OnInit {
  fiscalService: any;
  yearIdArr: any;

  constructor() { }

  ngOnInit(): void {
  }

  formObjKey

  onLoad() {
    this.fiscalService.getfiscalUlbForm(this.yearIdArr['2022-23'], this.ulbId).subscribe((res: any) => {
      console.log('fiscal res', res);
      // this.fiscalFormFeild = res;
      this.formObjKey = res?.fyDynemic;
      // this.expPerf = formObjKey?.expPerf;
      // this.revenueMob = formObjKey?.revenueMob;
      // this.uploadFyDoc = formObjKey?.uploadFyDoc;
    //  this.goverPar = formObjKey?.goverPar;
      // this.fillDataInForm(res?.data?.data);
      // this.changeNumToWords();
      // this.skipLogicForGov('onload');
    },
      (error) => {
        console.log(error);
      }
    )
  }
  ulbId(arg0: any, ulbId: any) {
    throw new Error('Method not implemented.');
  }

}
