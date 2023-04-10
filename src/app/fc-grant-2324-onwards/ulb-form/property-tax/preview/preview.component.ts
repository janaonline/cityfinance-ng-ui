import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionnaireService } from 'src/app/pages/questionnaires/service/questionnaire.service';
import { defaultDailogConfiuration } from "src/app/pages/questionnaires/ulb/configs/common.config";
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { SweetAlert } from "sweetalert/typings/core";
import { KeyValue } from '@angular/common';
import { PropertyTaxService } from '../property-tax.service';
const swal: SweetAlert = require("sweetalert");


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @ViewChild("preData") _html: ElementRef;
  @ViewChild("templateSave") saveTemplate;
  @Output() saveForm = new EventEmitter<any>(true);
  userData;
  ulbName: string = '';
  stateName: string = '';
  ulbId: string = "";
  dialogRef;
  yearList: string[] = ['#', '2018-19', '2019-20','2020-21', '2021-22', '2022-23'];
  yearWiseTabs: string[] = ['s3', 's4', 's5', 's6'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _questionnaireService: QuestionnaireService,
    public propertyService: PropertyTaxService,
  ) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    console.log({ html: this._html });
    if (this.userData?.role == "ULB") {
      this.ulbName = this.userData?.name;
      this.ulbId = this.userData?.ulb;
    }
    this.stateName = this.userData?.stateName;
  }
  
  styleForPDF = `<style>
    .header-p {
        background-color: #047474;
        text-align: center;
        padding: 10px;
    }
    .heading-p {
        color: #FFFFFF;
        font-size: 16px;
        margin-top: 1rem;
        font-weight: 700;
    }
    .pdf-hide{
      display : none;
    }
    .m-hed {
        font-size: 12px;
        margin-top: 1rem;
        font-weight: 500;
        margin-bottom: .5rem;
        text-align: center;
    }
    .f-label {
      font-size: 11px;
      margin-bottom: .5rem;
    }
    .yr-l {
      display : inline-block;
      width: 50%;
      font-size: 9px;
    }
    .yr-ans {
      display : inline-block;
      width: 50%;
      font-size: 9px;
    }
    .form-l {
      font-size: 11px;
      margin-bottom: .5rem;
    }
    .mb-1 {
      margin-bottom: .5rem;
    }
    .card {
      border: 1px solid rgba(0, 0, 0, 0.125);
      border-radius: 6px;
      padding: 6px;
      margin-bottom: 1rem;
      margin-left: .5rem;
    }
    .td {
      font-size: 6px;
    }
    .th {
      font-size: 6px;
      text-align: left;
    }
  </style>`;
  ngOnInit(): void {
    //preview data
    console.log('preview data', this.data)
  }

  closeMat() {
    this.dialog.closeAll();
  }

  clickedDownloadAsPDF() {
    if (!this.data?.additionalData?.pristine) return this.openDialog(this.saveTemplate);
    this.downloadAsPdf();
  }
  downloadAsPdf() {
    this._questionnaireService.downloadPDF({ html: this.styleForPDF + this._html.nativeElement.outerHTML }).subscribe(res => {
      this.propertyService.downloadFile(res.slice(0), "pdf", "fiscalRanking_2022-23.pdf");
    }, err => {
        this.onGettingError(' "Failed to download PDF. Please try after sometime."');
      }
    );
  }
  private onGettingError(message: string) {
    const option = { ...defaultDailogConfiuration };
    option.buttons.cancel.text = "OK";
    option.message = message;
    //   this.showLoader = false;
    this.dialog.open(DialogComponent, { data: option });
  }

  openDialog(template) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this.dialog.open(template, dialogConfig);
  }
  alertClose() {
    this.dialogRef.close();
  }

  saveAsDraft() {
    this.alertClose();
    this.saveForm.emit();
    setTimeout(() => {
      this.downloadAsPdf();
      this.data.additionalData.pristine = true;
    },2000)
  }


  sortPosition(itemA: KeyValue<number, any>, itemB: KeyValue<number, any>) {
    const a = +itemA.value.position;
    const b = +itemB.value.position;
    return a > b ? 1 : (b > a ? -1 : 0);;
  }
}
