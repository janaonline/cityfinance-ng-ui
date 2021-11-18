import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from "@angular/material/dialog";
import { QuestionnaireService } from 'src/app/pages/questionnaires/service/questionnaire.service';
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { defaultDailogConfiuration } from "../../../questionnaires/state/configs/common.config";
import { SweetAlert } from "sweetalert/typings/core";
import { GrantClaimsService } from '../grant-claims.service';
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-grant-claims-dialog',
  templateUrl: './grant-claims-dialog.component.html',
  styleUrls: ['./grant-claims-dialog.component.scss']
})
export class GrantClaimsDialogComponent implements OnInit {

  stateName = '';
  userName = '';
  designation = '';
  stateId = '';
  @ViewChild("claimComponent") _html: ElementRef;
  showLoader;
  marked = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog,
    private _questionnaireService: QuestionnaireService,
    private grantClaimService : GrantClaimsService
  ) { }
  styleForPDF = `<style>
  .header-p {
    background-color: #047474;
    height: 75px;
    text-align: center;
}
.heading-p {
    color: #FFFFFF;
    font-size: 18px;
    padding-top: 1rem !important;
    font-weight: 700;

}
.sub-h {
  font-weight: 600 !important;
  font-size: 14px;
}
h3 {
  font-size : 14px;
}
h4 {
  font-size : 13px;
}
li {
  font-size : 11px;
}
.h-cls {
  display: none;
}
.checkBox {
  font-size : 13px;
}
.term {
  font-size : 12px;
}
.checkBox {
  display : none;
}
.check-val {
  display: inline-block;
  font-size : 12px;
}
  </style>`;
  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem("userData"));
    this.stateName = userData["stateName"];
    this.userName = userData["name"];
    this.designation = userData['designation']
    this.stateId = userData['state']

  }

  closeDialog(){
    this._matDialog.closeAll()
  }
  isChecked(val) {
    console.log('check box', val)
    this.marked= val.target.checked;
    console.log('check box', this.marked)
  }
  submitClaim() {
    console.log('this.data---', this.data)
    let reqBody = {
      financialYear : this.data.fy,
      state : this.stateId,
      installment : this.data.ins,
      type: this.data.grantType,
      amountClaimed : this.data.amt
    }

    console.log('req body', reqBody);

    if(this.marked) {
      this.grantClaimService.claimGrantCreate(reqBody).subscribe((res)=>{
          console.log('submit responces..', res);
          let responce: any = res;
          this.data = {...this.data, res};
          this._matDialog.closeAll();
          swal('Saved', `${responce?.message}`, 'success');
          this.downloadAsPDF();
      },
      (err)=>{
        console.log('err', err)
      })


    }



  }
  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    this.showLoader = true;
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(res.slice(0), "pdf", `claimsGrant_${this.stateName}.pdf`);
        this.showLoader = false;
      },
      (err) => {
        this.showLoader = false;
        this.onGettingError(
          ' "Failed to download PDF. Please try after sometime."'
        );
      }
    );
  }
  private onGettingError(message: string) {
    const option = { ...defaultDailogConfiuration };
    option.buttons.cancel.text = "OK";
    option.message = message;
    this.showLoader = false;
    this._matDialog.open(DialogComponent, { data: option });
  }
  private downloadFile(blob: any, type: string, filename: string): string {
    const url = window.URL.createObjectURL(blob); // <-- work with blob directly

    const a = document.createElement("a");
    a.setAttribute("style", "display:none;");
    document.body.appendChild(a);

    a.href = url;
    a.download = filename;
    a.click();
    return url;
  }
}
