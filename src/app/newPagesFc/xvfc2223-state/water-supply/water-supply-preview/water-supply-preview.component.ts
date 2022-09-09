import { Component, ElementRef, OnInit, ViewChild, Inject, TemplateRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
import { QuestionnaireService } from "src/app/pages/questionnaires/service/questionnaire.service";
//import { defaultDailogConfiuration } from '../../../questionnaires/state/configs/common.config';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { defaultDailogConfiuration } from "src/app/pages/questionnaires/ulb/configs/common.config";
import { SweetAlert } from "sweetalert/typings/core";
import { WaterManagement } from "src/app/users/data-upload/models/financial-data.interface";
import { services, targets } from "src/app/users/data-upload/components/configs/water-waste-management";
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: 'app-water-supply-preview',
  templateUrl: './water-supply-preview.component.html',
  styleUrls: ['./water-supply-preview.component.scss']
})
export class WaterSupplyPreviewComponent implements OnInit {
  constructor(private _questionnaireService: QuestionnaireService,
    private _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: NewCommonService) { }
  @ViewChild("gtcpre") _html: ElementRef;
  // @ViewChild("annualPreview") _html: ElementRef;
  @ViewChild("templateSave") template;
  dialogRef;
  download;
  showLoader;
  stateName = "";
  fileUrl: any;
  fileName: any;
  formStatus:any;
  focusTargetKey: any = {}
  focusTargetKeyForErrorMessages: any = {}
  targets = targets;
  // @ViewChild("template") template;
  benchmarks = []
  services: {
    key: keyof WaterManagement;
    name: string;
    benchmark: string;
  }[] = services;
  uasList;
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
.formHeading{
  font-size: inherit !important;
}
p{
  font-size : 10px !important;
}
h5{
  font-size: 10px !important;
}
.sub-h {
  font-weight: 600 !important;
  font-size: 14px;
}

.form-h {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}
.m-d{
  margin-top: 10px !important;
}
.form-status {
  font-size: 10px;
}
  .card {
      margin-top: 10px !important;
      padding: 5px 10px;
      background-color: #EBF5F5;
  }

  .qus-h {
    margin-bottom: .5rem;
    margin-top: .5rem;
    font-size: 10px !important;
}

.ans-h {
    margin-bottom: .5rem;
    margin-left: 1.2rem;
    margin-top: .5rem;
    font-size: 10px !important;
}
.m-r{
  margin-bottom: 1.5rem !important;
}

 .h-cls{
        display: none;
      }
 .form-status {
        font-size: 10px;
        margin-top: 10px;
      }
      td, th{
        word-break: break-all;
        font-size: 9px !important;
        padding: 5px 1px !important;
      }
      .na-cls {
        text-decoration: none;
        color: black;
        pointer-events: none;
    }
    .indicators{
      width: 100%;
      background-color: #059b9a;
      margin: auto;
      height: auto;
      text-align: center;
      vertical-align: middle;
      line-height: 37px;
      color:white;
  }
  
  .indicatorsTableSummary{
      width: 100%;
      background-color: #ade9e9;
      margin: auto;
      height: auto;
      text-align: center;
      vertical-align: middle;
      line-height: 37px;
  }

  .indicatorsSummary{
      width: 100%;
      background-color: #ade9e9;
      height: auto;
      text-align: center;
      vertical-align: middle;
      line-height: 37px;
  }
  
  .tableBorder{
      border: 1px solid #b8b8b8;;
      width: 98% !important;
  }
  
  .highlighted{
      font-weight: 700;
  }
  .hrClass{
      width: 99%;
      height: 4px;
  }
  .tableDataSummary{
      width: 100%;
      background-color: #ade9e9;
      height: auto;
      vertical-align: middle;
      line-height: 37px;
  }
  .solidWasteSummary{
      border: 1px solid rgb(184, 184, 184);
      height: auto;
      width: 99%;
  }
  .disableAction{
      pointer-events: none;
  }
  .indicators{
    margin-top: 8% !important;
  }
  .pdfSuitable{
    width: 33% !important;
    position: relative !important;
    display: inline-block !important;
    text-align: center !important;
  }
    </style>`
  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem("userData"));
    console.log(this.data)
    if(this.data?.preData?.data?.isDraft == true){
       this.formStatus = "In Progress"
    }else if(this.data?.preData?.data?.isDraft == false){
      this.formStatus = "Completed"
    }else {
      this.formStatus = "Not Started"
    }
    this.stateName = userData["stateName"];

    this.uasList = Object.values(JSON.parse(sessionStorage.getItem("UasList")))
    console.log(this.uasList)



    this.services.forEach(data => {
      this.focusTargetKey[data.key + 'baseline'] = false
      this.targets.forEach(item => {
        this.focusTargetKey[data.key + item.key] = false
      })
    })
    this.services.forEach(data => {
      this.focusTargetKeyForErrorMessages[data.key + 'baseline'] = false
      this.targets.forEach(item => {
        this.focusTargetKeyForErrorMessages[data.key + item.key] = false
      })
    })

    this.benchmarks = this.services.map((el) => (parseInt(el.benchmark)))
  }
  clickedDownloadAsPDF(template) {
    this.download = true;
    let changeHappen;
    
      // changeHappen = sessionStorage.getItem("changeInPropertyTax");
    console.log(changeHappen)
    if (changeHappen === "true") {
      this.openDialog(template);
    } else {
      this.downloadAsPDF();
    }
  }
  openDialog(template) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
  }
  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    this.showLoader = true;
    let downloadFileName = this.fileName ? this.fileName : "water-supply.pdf";
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(res.slice(0), "pdf", downloadFileName);
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

    // create hidden dom element (so it works in all browsers)
    const a = document.createElement("a");
    a.setAttribute("style", "display:none;");
    document.body.appendChild(a);

    // create file, attach to hidden element and open hidden element
    a.href = url;
    a.download = filename;
    a.click();
    return url;
  }
  closeMat() {
    this._matDialog.closeAll();
  }
  async proceed(uploadedFiles) {
    this.dialogRef.close();
    this._matDialog.closeAll();
    await this.submit();
    await this.downloadAsPDF();
  }

  async submit() {
    console.log("water supply preview", this.data?.dataPreview);
    let body = { ...this.data?.dataPreview,
      isDraft: true };
    return new Promise((resolve, rej) => {
      this.commonService.submitPtForm(body).subscribe(
        (res) => {
         
            // sessionStorage.setItem("changeInPropertyTax", "false");
          
          console.log(res);
          swal("Saved", "Data saved as draft successfully", "success");
          resolve("sucess");
        },
        (err) => {
         
          // sessionStorage.setItem("changeInPropertyTax", "false");
          

          swal("Error", "Failed To Save", "error");
          resolve(err);
        }
      );
    });
  }

  alertClose() {
    this.stay();
  }

  stay() {
    this.dialogRef.close();
  }
}
