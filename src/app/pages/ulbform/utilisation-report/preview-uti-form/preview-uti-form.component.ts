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

  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
    font-size: 12px;
  }
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

.header-u-p {
    background-color: #047474;
    text-align: center;
    padding: 10px;
}

.heading-u-p {
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 700;
    padding-top: .5rem;
}

.h-uti-p {
    font-size: 16px;
    font-weight: 700;
    margin-top: 1rem;
    color: #FFFFFF;
}

.s-h-uti {
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
}

.se-r {
    margin-top: 2%;
}

.st-n {
    font-size: 12px;
    font-weight: 600;
}

.m-top {
    margin-top: 1%;
    margin-bottom: 2%;
}

tr {
    text-align: center;
}


.f-text {
    text-decoration: underline;
    font-weight: 500;
    font-size: 14px;
    padding-top: 2rem;

}

.sig-text {
    font-weight: 500;
    font-size: 12px;
    text-align: center;
}

.m-b {
    margin-top: .5rem !important;
    margin-bottom: 5%;
}

.pd-row {
    padding-left: 4%;
    padding-right: 4%;
}

.pd-row-n {
    padding-left: 2%;
    padding-right: 2%;
}
.name-row {
    margin-top: 4rem !important;
    font-weight: 500;
    font-size: 12px;
    text-align: center;
}
.pdf-hide{
  display : none;
}


.f-table>table>tbody>tr>td,
  .table>tbody>tr>th,
  .table>tfoot>tr>td,
  .table>tfoot>tr>th,
  .table>thead>tr>td,
  .table>thead>tr>th {
      padding: 4px 0px;
      line-height: 1.42857143;
      vertical-align: middle;


}
.pj-tb{
  margin-top: 3rem;
}
.pd-r {
  padding-left : 6px !important;
}
.se-tb{
  padding-top : 1rem !important;
}
.pd-th {
  padding-left: 2px !important;
  padding-right: 2px !important;
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
  analytics = []
  swm = []
  wm = []
  categories;
  totalWmAmount = 0;
  totalSwmAmount = 0;
  ngOnInit() {
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
    // this.analytics = this.data.analytics;
    // this.categories = this.data.categories;
    //     this.analytics.forEach(el => {
    //       this.categories.forEach(element => {
    //         if (element._id == el['_id']) {
    //           el['categoryName'] = element.name
    //         }
    //       });
    //     })
    //     console.log('prev ana...',this.analytics, this.categories)
    //     this.analytics.forEach(el => {
    //       if (el.categoryName == 'Solid Waste Management' || el.categoryName == 'Sanitation') {
    //         this.swm.push(el)
    //       } else {
    //         this.wm.push(el)
    //       }
    //     })
    this.data.wm.forEach(el => {
      this.totalWmAmount = this.totalWmAmount + el.amount;
    });
    this.data.swm.forEach(el => {
      this.totalSwmAmount = this.totalSwmAmount + el.amount;
    });
    // alert(this.totalWmAmount);
    // alert(this.totalSwmAmount);
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
  dialogClose() {
    this._matDialog.closeAll();
  }
}
