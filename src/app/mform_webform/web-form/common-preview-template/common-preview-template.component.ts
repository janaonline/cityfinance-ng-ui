import { Component, ElementRef, Inject, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CommonService } from '../common.service';

@Component({
  selector: 'app-common-preview-template',
  templateUrl: './common-preview-template.component.html',
  styleUrls: ['./common-preview-template.component.scss']
})
export class CommonPreviewTemplateComponent implements OnInit, OnChanges {

  constructor(
    @Inject(MAT_DIALOG_DATA) public preData: any,
    private _matDialog: MatDialog,
    private webCommonService : CommonService
  ) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.allStatusIds = JSON.parse(localStorage.getItem("allStatusArray"));
    // this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
    this.ulbId = this.userData?.ulb;
    this.ulbName = this.userData?.name;
    this.stateName = this.userData?.stateName;
    if (!this.ulbId) {
      this.ulbId = localStorage.getItem("ulb_id");
      this.ulbName = sessionStorage.getItem("ulbName");
      this.stateName = sessionStorage.getItem("stateName");
    }
  }

  @ViewChild("downloadTemp") _html: ElementRef;
  @ViewChild("templateSave") template;
  dialogRef;
  userData;
  allStatusIds: [] = []
  styleForPDF = `<style>
  .hi {
    display: none;
  }
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
    font-weight: 700 !important;
    font-size: 14px;
}

.form-h {
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  }

  .card {
    padding: 5px 10px;
    background-color: #EBF5F5;
  }
  .d-qus {
    display: inline-block;
    width: 60% !important;
    font-size: 10px !important;
    font-weight: 500 !important;
  }
  .d-ans {
    display: inline-block;
    width: 38% !important;
    font-size: 10px !important;
  }
  .mrB {
    margin-bottom: 1rem;
  }
  .mrT {
    margin-bottom: 1rem;
  }
  .mrTh {
    margin-top: 1.25rem;
  }
  .form-status {
    font-size: 10px !important;
    font-weight: 500 !important;
  }
  .score {
    border: 1px solid transparent;
    background: limegreen;
    border-radius: 4px;
    color: #fff;
   padding: 5px;
  }
  .row {
    display:flex !important;
    align-items: center !important;
  }
  </style>`
  formStatus: string = '';
  stateName:string = '';
  ulbName:string = '';
  ulbId:string='';
  ngOnInit(): void {
    console.log('preData......', this.preData);
    console.log('status......', this.allStatusIds);
    // let statusObj:any = this.allStatusIds.find(({ statusId  }) => statusId === this.preData?.qusResponce?.data[0].status);
     this.formStatus = this.preData?.qusResponce?.data[0].status;
  }

  ngOnChanges() {
  this.formStatus = this.preData?.qusResponce?.data[0].status;
  }



  closeDialog(){
    this._matDialog.closeAll();
  }
  clickedDownloadAsPDF(template) {
    // this.downloadForm();
   // let canNavigate = sessionStorage.getItem("changeInUti");
    // if (canNavigate == "true") {
    //   this.openDialog(template);
    //   return;
    // } else {
    //   this.downloadForm();
    // }
    this.downloadAsPDF();
  }
  alertClose() {
    this.stay();
  }

  stay() {
    this.dialogRef.close();
  }
  openDialog(template) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
  }
  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
  //  this.showLoader = true;
    this.webCommonService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(res.slice(0), "pdf", `${this.preData?.qusResponce?.data[0]?.language[0]?.title.split(' ').join('_')}.pdf`);
      //  this.showLoader = false;
      },
      (err) => {
       // this.showLoader = false;
       // this.onGettingError(
        //  ' "Failed to download PDF. Please try after sometime."'
      //  );
      }
    );
  }
  // private onGettingError(message: string) {
  //   const option = { ...defaultDailogConfiuration };
  //   option.buttons.cancel.text = "OK";
  //   option.message = message;
  //   this.showLoader = false;
  //   this._matDialog.open(DialogComponent, { data: option });
  // }
  private downloadFile(blob: any, type: string, filename: string): string {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("style", "display:none;");
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.click();
    return url;
  }
  identity(index: any, item: any) {
    // console.log('identity', index, item)
    return item.order;
    // return index;
  }
}
