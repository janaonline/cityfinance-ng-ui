import { Component, ElementRef, OnInit, ViewChild, Inject, TemplateRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { USER_TYPE } from "src/app/models/user/userType";
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
import { QuestionnaireService } from "src/app/pages/questionnaires/service/questionnaire.service";
//import { defaultDailogConfiuration } from '../../../questionnaires/state/configs/common.config';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { defaultDailogConfiuration } from "src/app/pages/questionnaires/ulb/configs/common.config";
@Component({
  selector: 'app-odf-form-preview',
  templateUrl: './odf-form-preview.component.html',
  styleUrls: ['./odf-form-preview.component.scss']
})
export class OdfFormPreviewComponent implements OnInit {

  constructor(private _questionnaireService: QuestionnaireService,
    private _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: NewCommonService) { }
  @ViewChild("gtcpre") _html: ElementRef;
  // @ViewChild("annualPreview") _html: ElementRef;
  @ViewChild("templateAnnual") template;
  showLoader;
  ulbName = "";
  stateName = "";
  certDate: any;
  fileUrl: any;
  ratings;
  dropdownValues;
  ratingId: any;
  ratingName: any;
  fileName: any;
  isGfcOpen: boolean = true;
  previewData:any
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

    </style>`
  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem("userData"));
    console.log(this.data)
    console.log(this.data.previewData.data.cert.url)
    this.fileUrl = this.data.previewData.data.cert.url
    // this.certDate = this.data.formData.certDate;
    // this.fileUrl = this.data.formData.cert;
    // this.ratingId = this.data.formData.rating;
    this.fileName = this.data?.formData?.cert?.name;
    this.certDate = this.data?.formData?.certDate;
    this.ratingId = this.data?.formData?.rating;
    console.log(this.fileName)
    this.previewData = this.data.formData;
    console.log(this.previewData)
    if (userData.role !== USER_TYPE.ULB) {
      this.ulbName = sessionStorage.getItem("ulbName");
    } else {
      this.ulbName = userData["name"];
    }
    this.stateName = userData["stateName"];
    this.isGfcOpen = this.data.isGfcOpen
    if (this.isGfcOpen) {
      this.commonService.getGfcFormData('gfc').subscribe((res: any) => {
        this.ratings = res.data
        let selectedGFCRating = this.ratings.find(res => res._id.toString() == this.ratingId);
        this.ratingName = selectedGFCRating?.name
        console.log(this.ratingName)
      });     
    } else {
      this.commonService.getOdfRatings().subscribe((res: any) => {
        this.ratings = res.data
        console.log(this.ratings, 'ratingId', this.ratingId)
        let selectedODF = this.ratings.find(res => res._id.toString() == this.ratingId);
        console.log('nAMW', selectedODF);
        this.ratingName = selectedODF?.name
      });
    }
     
  }
  clickedDownloadAsPDF() {
    this.downloadAsPDF();
  }
  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    this.showLoader = true;
    let downloadFileName = this.fileName ? this.fileName : "odf.pdf";
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
}
