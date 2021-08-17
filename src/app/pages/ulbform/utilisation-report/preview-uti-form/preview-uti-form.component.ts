import {
  Component,
  OnInit,
  Inject,
  Input,
  ElementRef,
  ViewChild,
} from "@angular/core";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from "@angular/material/dialog";
import { QuestionnaireService } from "../../../questionnaires/service/questionnaire.service";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { defaultDailogConfiuration } from "../../../questionnaires/state/configs/common.config";
//
import { Router, Event } from "@angular/router";
import { UlbformService } from "../../ulbform.service";
import { UtiReportService } from "../uti-report.service";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
// import * as jspdf from 'jspdf';
@Component({
  selector: "app-preview-uti-form",
  templateUrl: "./preview-uti-form.component.html",
  styleUrls: ["./preview-uti-form.component.scss"],
})
export class PreviewUtiFormComponent implements OnInit {
  @Input() parentData: any;
  @ViewChild("previewUti") _html: ElementRef;
  @ViewChild("template") template;
  showLoader;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _questionnaireService: QuestionnaireService,
    private _matDialog: MatDialog,
    private UtiReportService: UtiReportService,
    public _ulbformService: UlbformService,
    public _router: Router
  ) { }
  styleForPDF = `<style>

td, th{
  word-break: break-all;
  font-size: 9px !important;
  padding: 5px 1px !important;
}

.mat-dialog-content {
  padding: 0 0 0 0;
  max-width: 100vw;
  max-height: 100vw;
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
font-size: 15px;
font-weight: 700;
text-align: center;
}


.h-ut{
  font-size: 10px !important;
  margin-top: 1rem !important;
  margin-bottom: .5rem !important;
  margin-left: 1rem !important;
}
.h-ut-t{
  font-size: 10px !important;
  margin-top: 1rem !important;
  margin-bottom: .5rem !important;
}
.qus-ut-s {
  font-size: 10px !important;
  margin-left: .9rem;
}
.qus-ut-u {
  font-size: 10px !important;
  margin-left: 1rem;
}
.qus-ut-t {
  font-size: 10px !important;
  margin-left: 1rem;
  margin-bottom: 1rem !important;
}
.pp {
  margin-top: .5rem !important;
}
.ans-ut-s {
  font-size: 10px !important;
  margin-left: 5.4rem;
}
.ans-ut-u {
  font-size: 10px !important;
  margin-left: 1.3rem;
}
.ans-ut-t {
  font-size: 10px !important;
  margin-left: 4.9rem;
  margin-bottom: 1rem !important;
}
.ans-ut-a {
  margin-left: 7.2rem;
}
.ans-ut-b {
  margin-left: 7.5rem;
}
.ans-ut-c {
  margin-left: 6.9rem;
}
.ans-ut-l{
  margin-left: 1rem;

}

.dnDiv {
  margin-top: 10px;
  margin-right: 5%;
}
.dnldBtn {
  background-color: #26A1A1;
  color: #FFFFFF;
  font-weight: normal;
}
.card2Div {
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
}
.mat-dialog-container {
  padding: 0;
}
.mat-card2 {
  padding: 5px 2px;
  margin-top: 10px;
  background-color: #EBF5F5;
  display: block;
}

.crd-ls-div {
  margin-bottom: 15px;
}
.c-2-d {
  margin-left: 1.7rem !important;
  margin-bottom: 1rem !important;
}
label {
  font-weight: normal;
}
.thHeader {
  background-color: #E9E9E9;
  color: #047474;
  font-size: 15px;
  font-weight: normal;
}
th {
  font-weight: normal;
  vertical-align: middle;
  text-align: center;
}
.table>tbody>tr>td,
.table>tbody>tr>th,
.table>tfoot>tr>td,
.table>tfoot>tr>th,
.table>thead>tr>td,
.table>thead>tr>th {
  vertical-align: middle;
  padding: 10px 6px;
}
.bor-in-l {
  word-break: break-all;
}
.long{
  margin-left: .25rem;
}
.tableFooterDiv {
  background-color: #E7E7E7;
  color: #000000;
  font-size: 16px;
}
.f-d-n {
  background-color: #CFCFCF;
  width: 235px;
  height: 35px;
  padding: 7px 8px;
  height: 15px !important;
}
.d-none {
  display: none;
}
label{
  font-size: 9px !important;
}
.font-9{
  font-size: 9px !important;
}
.pdf-hide{
  display: none;
}
.w-5{
width: 5% !important;
}
.w-10{
  width: 10% !important;
}
.w-11{
  width: 11% !important;
}
.w-12{
  width: 12% !important;
  line-break: strict !important;
}
.w-15{
  width: 15% !important;
}
.form-status-ut {
  font-size: 10px;
  margin-top: 10px;

}
.d-status{
  padding-left: 1% !important;
}

  </style>`;

  @Input()
  changeFromOutSide: any;

  subParentForModal;

  formStatusCheck = "";
  statusArray = [
    'Not Started',
    'Under Review By State',
    'Completed',
    'In Progress'
  ]
  totalStatus;
  ngOnInit(): void {
    console.log('preview data', this.data);

    this.subParentForModal = this.UtiReportService.OpenModalTrigger.subscribe(
      (change) => {
        if (this.changeFromOutSide) {
          this.openDialog(this.template);
        }
      }
    );

    if (this.parentData) {
      this.genrateParentData();
    }
    let getData = JSON.parse(sessionStorage.getItem("utilReport"))
    console.log("getData", getData);
    console.log("Data", this.data);
    if (!getData.hasOwnProperty('blankForm')) {
      let canNavigate = sessionStorage.getItem("canNavigate");
      if (canNavigate == "false") {
        if (this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[3]
        } else if (!this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[2]
        }
      } else if (canNavigate == "true") {
        if (this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[3]
        } else if (!this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[2]
        }

      }
    } else {
      let canNavigate = sessionStorage.getItem("canNavigate");
      if (canNavigate == "false") {
        if (this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[3]
        } else if (!this.data['isDraft']) {
          this.formStatusCheck = this.statusArray[2]
        }
      } else if (canNavigate == "true") {
        this.formStatusCheck = this.statusArray[0]

      }

    }

    this.setTotalStatus();
  }

  ngOnDestroy(): void {
    this.subParentForModal.unsubscribe();
  }

  setTotalStatus() {
    if (!this.parentData) {
      this.totalStatus = sessionStorage.getItem("masterForm");
      if (this.totalStatus) {
        this.totalStatus = JSON.parse(this.totalStatus);
        if (this.totalStatus["isSubmit"]) {
          this.totalStatus = "Completed but Not Submitted";
        } else {
          this.totalStatus = "In Progress";
        }
      } else {
        this.totalStatus = "Not Started";
      }
    }
  }
  clickedDownloadAsPDF(template) {
    let canNavigate = sessionStorage.getItem("canNavigate");
    if (canNavigate === "false") {
      this.openDialog(template);
      return;
    } else {
      this.downloadForm();
    }
  }

  genrateParentData() {
    this.parentData.totalProCost = 0;
    this.parentData.totalExpCost = 0;
    this.parentData.projects.forEach((element) => {
      this.parentData.totalProCost += parseFloat(
        element.cost == "" ? 0 : element.cost
      );
      this.parentData.totalExpCost += parseFloat(
        element.expenditure == "" ? 0 : element.expenditure
      );
    });
    this.data = this.parentData;
  }

  // makePdf() {
  //   let showMagicDisplay = document.querySelectorAll('[class*="pdf-hide"]');
  // showMagicDisplay.forEach((item) => {
  // item.classList.add("d-none");
  // });

  // let doc = new jspdf('1' , 'mm' , 'a4');
  //   const content = this._html.nativeElement;
  // doc.fromHTML(content.innerHTML, 15, 15, {
  // width: 190
  // });
  //doc.save("obrz.pdf");
  //  doc.addHTML(this._html.nativeElement, function() {
  //   doc.save("utilization-report.pdf");
  //   showMagicDisplay.forEach((item) => {
  //     item.classList.remove("d-none");
  //      });
  //   });

  //  doc.addHTML(this._html.nativeElement, function() {
  //   doc.save("utilization-report.pdf");
  //   showMagicDisplay.forEach((item) => {
  //     item.classList.remove("d-none");
  //      });
  //   });

  //   }
  Years = JSON.parse(localStorage.getItem("Years"));
  downloadForm() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    this.showLoader = true;

    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        console.log("vishu", res);
        this.downloadFile(res.slice(0), "pdf", "utilization-report.pdf");
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

  dialogRef;
  openDialog(template) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
  }
  alertClose() {
    this.stay();
  }

  stay() {
    this.dialogRef.close();
  }
  errMessage = "";
  copyData;
  async proceed(uploadedFiles) {
    // await this.modalRef.hide();
    this.dialogRef.close();
    sessionStorage.setItem("canNavigate", "true");
    console.log("preview Data", this.data);
    this.copyData = this.data;
    // delete this.copyData['totalExpCost'];
    // delete this.copyData['totalProCost'];
    // delete this.copyData['ulbName'];
    // delete this.copyData['state_name'];
    this.copyData["designYear"] = this.Years["2021-22"];
    this.copyData["financialYear"] = this.data["useData"]["financialYear"];
    this.copyData["isDraft"] = this.data["useData"]["isDraft"];
    this.copyData["ulb"] = this.data["useData"]["ulb"];
    this.copyData["namedProjects"] = this.data["projects"];
    this.copyData["projects"] = this.data["useData"]["projects"];
    for (let i = 0; i < this.data["projects"].length; i++) {
      this.copyData["projects"][i]["CatName"] =
        this.copyData["namedProjects"][i]["category"];
    }
    this.copyData.projects.forEach(element => {
      element.category = element.category_id
    });
    console.log("copy Data", this.copyData);
    this.UtiReportService.createAndStorePost(this.copyData).subscribe(
      (res) => {
        swal("Record submitted successfully!");
        const status = JSON.parse(sessionStorage.getItem("allStatus"));
        status.utilReport.isSubmit = res["isCompleted"];
        this._ulbformService.allStatus.next(status);
        console.log(res);
        // this.copyData['projects'] = this.data['projects']
      },
      (error) => {
        swal("An error occured!");
        this.errMessage = error.message;
        console.log(this.errMessage);
      }
    );

    if (this.changeFromOutSide) {
      this._ulbformService.initiateDownload.next(true);
    } else this.downloadForm();
  }
}
